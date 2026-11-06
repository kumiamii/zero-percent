//============================================================================
// EliMZ_MaxItems.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦1.3.1♦ Set a individual limit for each item through note tags.
@author Hakuen Studio
@url https://docs.google.com/document/d/1gIMyCz52JaAUiQuMsYeIpj0XBh6PqjjgzwDJKTgSY3I/edit?usp=sharing

@help
↑↑↑ HOW TO USE / HELP FILE ABOVE ↑↑↑

★★★★★ → Rate the plugin! Please, is very important to me ^^
https://hakuenstudio.itch.io/eli-max-items-for-rpg-maker/rate?source=game

♦ TERMS OF USE
https://www.hakuenstudio.com/terms-of-use-5-0-0

♦ DOWNLOAD
https://hakuenstudio.itch.io/eli-max-items-for-rpg-maker

♦ SUPPORT
https://hakuenstudio.itch.io/eli-max-items-for-rpg-maker/community

♦ FEATURES
- Limit the maximum amount of each item/weapon/armor the player can have 
through the item note tag using numbers or variable value.
- Surpass the 99 item limit.
- Play a common event when the party gets full of an item.

@param maxDefault
@text Max Default
@type Number
@desc The maximum amount an item can have by default. Set -1 to use the default value from RPG Maker.
@default 99

@param includeEquip
@text Include Equip
@type boolean
@desc If true, equipped items will count to to hit the maximum value too.
@default false

@param fullCommonEventId
@text Full Common Event Id
@type common_event
@desc Will play when tries to give an item to the party that will make them full of this item.
@default 0

@param -- Variables --

@param varItemName
@text Item Name
@type variable
@desc The name of the item given to the player when he gets full.
@default 0
@parent -- Variables --

@param varItemAmount
@text Item Amount Attempt
@type variable
@desc The amount of the item that tried to give to the player when he gets full.
@default 0
@parent -- Variables --

@param varItemReceived
@text item Amount Received
@type variable
@desc The amount of the item that the party received to get full.
@default 0
@parent -- Variables --

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_MaxItems = true

Eli.MaxItems = {

	tempEquipCount: 0,
	numberTextWidth: "",

	Parameters: class Parameters {
		constructor(parameters){
			const maxDefault = Number(parameters.maxDefault)
			this.maxDefault = maxDefault === -1 ? undefined : maxDefault
			this.includeEquip = parameters.includeEquip === "true"
			this.fullCommonEventId = Number(parameters.fullCommonEventId) || 0
			this.varItemName = Number(parameters.varItemName) || 0
			this.varItemReceived = Number(parameters.varItemReceived) || 0
			this.varItemAmount = Number(parameters.varItemAmount) || 0
		}
	},

	initialize(){
		Eli.VersionManager.register("EliMZ_MaxItems", "1.3.1")
		this.initParameters()
		this.numberTextWidth = this.createMaxNumberTextWidth()
	},

	initParameters(){
		this.parameters = new this.Parameters(PluginManager.parameters("EliMZ_MaxItems"))
	},

	createMaxNumberTextWidth(){
		let maxNumbers = String(this.getParam().maxDefault).length
		let text = ""

		while(maxNumbers--){
			text += "0"
		}

		return text
	},

	getParam(){
		return this.parameters
	},  

}

{

const Plugin = Eli.MaxItems
const Alias = {}

Plugin.initialize()

/* ------------------------------- GAME PARTY ------------------------------- */
Alias.Game_Party_gainItem = Game_Party.prototype.gainItem
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
	const container = this.itemContainer(item)
	const oldNumItem = container ? this.numItems(item) : 0

	Alias.Game_Party_gainItem.call(this, item, amount, includeEquip)

	if(container && this.canPlayMaxItemsCommonEvent(item, oldNumItem, amount)){
		this.playMaxItemCommonEvent(item, oldNumItem, amount)
	}
}

Game_Party.prototype.canPlayMaxItemsCommonEvent = function(item, oldNumItem, amount){
	const totalAmount = oldNumItem + amount
	return Plugin.getParam().fullCommonEventId > 0 && totalAmount > this.maxItems(item)
}

Game_Party.prototype.playMaxItemCommonEvent = function(item, oldNumItem, amount){
	const receivedItem = Math.max(0, this.numItems(item) - oldNumItem)
	$gameVariables.setValue(Plugin.getParam().varItemName, item.name)
	$gameVariables.setValue(Plugin.getParam().varItemReceived, receivedItem)
	$gameVariables.setValue(Plugin.getParam().varItemAmount, amount)
	$gameTemp.reserveCommonEvent(Plugin.getParam().fullCommonEventId)
}

Alias.Game_Party_maxItems = Game_Party.prototype.maxItems
Game_Party.prototype.maxItems = function(item) {
	const alias = Alias.Game_Party_maxItems.call(this, item)

	if(item?.meta?.MaxAmount){
		return this.getCustomMaxItemAmount(item)
	}else{
		return Plugin.getParam().maxDefault ?? alias
	}
}

Game_Party.prototype.getCustomMaxItemAmount = function(item){
	const maxItem = new Function(`return ${Eli.Utils.convertEscapeVariablesOnly(item.meta.MaxAmount)}`)()
	const equippedItems = this.getEquippedItemAmount(item)
	const result = maxItem - equippedItems + Plugin.tempEquipCount

	return result
}

Game_Party.prototype.getEquippedItemAmount = function(item){
	let equippedItems = 0

	if(Plugin.getParam().includeEquip && !DataManager.isItem(item)){

		for(const actor of this.members()){

			for(const equip of actor.equips()){
				equippedItems += equip === item ? 1 : 0
			}

		}
	}

	return equippedItems
}

/* ------------------------------- GAME ACTOR ------------------------------- */
Alias.Game_Actor_changeEquip = Game_Actor.prototype.changeEquip
Game_Actor.prototype.changeEquip = function(slotId, item) {
	this.setTempEquipCount(slotId, item)
	Alias.Game_Actor_changeEquip.call(this, slotId, item)
	Plugin.tempEquipCount = 0
}

Game_Actor.prototype.setTempEquipCount = function(slotId, item){
	if(this.equips()[slotId] && item !== this.equips()[slotId]){
		Plugin.tempEquipCount = 1
	}else{
		Plugin.tempEquipCount = 0
	}
}

/* ------------------------------- WINDOW ITEM ------------------------------ */
Window_ItemList.prototype.numberWidth = function() {
	return this.textWidth(Plugin.numberTextWidth)
}

Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
	if (this.needsNumber()) {
		this.drawText(":", x, y, width - this.numberWidth(), "right")
		this.drawText($gameParty.numItems(item), x, y, width, "right")
	}
}

}
