//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.90;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.90] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * ---
 *
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 * - This does NOT set the max cap to be lower than the default cap.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * 
 * ---
 * 
 * === Tileset-Related Notetags ===
 * 
 * ---
 * 
 * <Taller By x: id>
 * 
 * - Used for: Tileset Notetags
 * - Changes any page B, C, D, E tile marked by terrain tag 'id' to be taller
 *   by 'x' tiles.
 *   - Replace 'x' with a number representing the tiles to be taller by.
 *   - Replace 'id' with a number representing the Terrain Tag you will use to
 *     mark this tile with in the Database editor.
 * - When placing these tiles on the map, all you have to do is just place the
 *   bottom tile.
 *   - ie.: For a tree that's one tile taller, just place the tile at the
 *     bottom where you see the trunk.
 *   - Then, in-game, the tree will appear taller by one tile as marked.
 * - Depending on the priority settings, the tile will appear on different
 *   layers.
 *   - O will place the tile on the below player layer.
 *   - X will place the tile on the same level as the player.
 *   - ★ will place the tile on the above player layer.
 *   - O/X layer tiles have a special property where tall sprites standing in
 *     front of it will no longer clip the top of the sprite, while sprites
 *     standing behind it will be covered by it.
 *   - The X layer sprite will only have a hitbox of 1x1 at the base.
 * - This does not work with events using tiles as graphics. Instead, if you
 *   want to do similar, use the Event & Movement Core's <Tile Expand> notetags
 *   for better control.
 * 
 * ---
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want to use it automatically.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Volume
 * - Changes the current BGS volume without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Volume:
 *   - Change the current BGS's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pitch
 * - Changes the current BGS pitch without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pitch:
 *   - Change the current BGS's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pan
 * - Changes the current BGS pan without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pan:
 *   - Change the current BGS's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 * 
 *   CTRL + n: Quick Load:
 *   - CTRL + a number from 1 to 9 will yield a quick load of that safe file.
 *   - Does not count auto saves.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - If multiple targets are recorded, then the first of the recorded
 *       targets will be set for this variable.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *     - This means you need to go to your own project's rmmz_core.js and
 *       modify Input.keyMapper to have buttons with "cancel" and "menu"
 *       instead of only "escape".
 *     - If there are none found, an error message will appear telling you to
 *       do so, or set the 'Split "Escape"' option to false.
 *     - If you are using Options Core's Rebind Keyboard option, be sure to
 *       have those have "cancel" and "menu" options inside there, too.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 * 
 *   Convert JS To Base?:
 *   - Automatically convert <JS param Plus/Rate/Flat: code> to use base
 *     parameters to prevent infinite loops.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 * 
 *   State Icons Non-Frame:
 *   - Replace sprite frame system for non-frame.
 *   - Better for any instances where icons are zoomed.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.90: February 16, 2026
 * * Feature Update!
 * ** Battle System settings for "TPB Active" and "TPB Wait" will no longer
 *    conflict with VisuMZ_2_BattleSystemATB and VisuMZ_1_OptionsCore "Active"
 *    or "Wait" mode options set by the player.
 * 
 * Version 1.89: December 15, 2025
 * * Feature Update!
 * ** Added extra failsafes to ensure TPB Charge Time does not become NaN or
 *    an illegal value. Update made by Arisu.
 * 
 * Version 1.88: September 18, 2025
 * * Documentation Update!
 * ** Extra notes for <JS param Plus/Rate/Flat: code> notetags
 * *** Use 'user' to refer to the currently equipping actor.
 * *** If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 * *** Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 * *** Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 * *** Turn this off if you do not want it.
 * *** You are responsible for any infinite loops this may cause.
 * * Feature Update!
 * ** <JS param Plus/Rate/Flat: code> now support 'user' as a variable.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Parameters > Convert JS To Base?
 * **** Automatically convert <JS param Plus/Rate/Flat: code> to use base
 *      parameters to prevent infinite loops.
 * 
 * Version 1.87: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * *** Better compatibility with different icon sizes.
 * * Documentation Update!
 * ** Under Plugin Parameters: Menu Button Assist Window
 * *** Added text segments under Split "Escape"
 * **** This means you need to go to your own project's rmmz_core.js and
 *      modify Input.keyMapper to have buttons with "cancel" and "menu"
 *      instead of only "escape".
 * **** If there are none found, an error message will appear telling you to
 *      do so, or set the 'Split "Escape"' option to false.
 * **** If you are using Options Core's Rebind Keyboard option, be sure to
 *      have those have "cancel" and "menu" options inside there, too.
 * * Feature Update!
 * ** Plugin Parameters > Button Assist > Split "Escape" will now show an error
 *    message if a custom Input.keyMapper is not found with the "cancel" and
 *    "menu" keys implemented. Update made by Irina.
 * ** Updated Plugin Parameters > Button Assist > Split "Escape" description
 *    for Plugin Parameters to add in the following text: Requires custom
 *    Input.keyMapper with "cancel" and "menu".
 * ** Added better compatibility with WASD controls as to prioritize showing
 *    the arrow keys rather than the W, A, S, D keys. Also applies to any other
 *    rebindings.
 * 
 * Version 1.86: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an issue where certain icons were not aligning properly at
 *    different line height settings. Fix made by Olivia.
 * 
 * Version 1.85: October 17, 2024
 * * Feature Updates!
 * ** Updated to fit RPG Maker MZ's updated 1.8.1 version better.
 * 
 * Version 1.84: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New notetags added by Arisu:
 * *** Tileset Notetag: <Taller By x: id>
 * **** Changes any page B, C, D, E tile marked by terrain tag 'id' to be
 *      taller by 'x' tiles.
 * **** When placing these tiles on the map, all you have to do is just place
 *      the bottom tile.
 * ***** ie.: For a tree that's one tile taller, just place the tile at the
 *       bottom where you see the trunk. Then, in-game, the tree will appear
 *       taller by one tile as marked.
 * **** O/X layer tiles have a special property where tall sprites standing in
 *      front of it will no longer clip the top of the sprite, while sprites
 *      standing behind it will be covered by it.
 * **** This does not work with events using tiles as graphics. Instead, if
 *      you want to do similar, use the Event & Movement Core's <Tile Expand>
 *      notetags for better control.
 * 
 * Version 1.83: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated documentation for <param Max: x> notetag.
 * *** This does not set the max cap to be lower than the default cap.
 * * New Feature!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > UI Settings > State Icons Non-Frame
 * **** Replace sprite frame system for non-frame.
 * **** Better for any instances where icons are zoomed.
 * 
 * Version 1.82: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added failsafe for $textPopup when some windows have not been initialized
 *    and requesting the text popup.
 * * New Feature!
 * ** New Plugin Parameter and playtest shortcut added by Arisu:
 * *** Plugin Parameters > QoL Settings > Playtest > CTRL + n: Quick Load
 * **** CTRL + a number from 1 to 9 will yield a quick load of that save file.
 * **** Does not count auto saves.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param CtrlQuickLoad:eval
 * @text CTRL + n: Quick Load
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc CTRL + a number from 1 to 9 will yield a quick load of
 * that safe file. Does not count auto saves.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * Leave empty to not use this feature.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * Requires custom Input.keyMapper with "cancel" and "menu".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param ConvertToBase:eval
 * @text Convert JS To Base?
 * @parent BasicParameters
 * @type boolean
 * @on Convert
 * @off Don't
 * @desc Automatically convert <JS param Plus/Rate/Flat: code>
 * to use base parameters to prevent infinite loops.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param StateIconsNonFrame:eval
 * @text State Icons Non-Frame
 * @parent UIArea
 * @type boolean
 * @on Non-Frame
 * @off Normal
 * @desc Replace sprite frame system for non-frame.
 * Better for any instances where icons are zoomed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x4a5d62=_0x1f9c;(function(_0x5ea550,_0x3e4a3b){const _0x3c5e4e=_0x1f9c,_0x463070=_0x5ea550();while(!![]){try{const _0x5cea2c=-parseInt(_0x3c5e4e(0x4d8))/0x1*(parseInt(_0x3c5e4e(0x56f))/0x2)+parseInt(_0x3c5e4e(0x801))/0x3*(parseInt(_0x3c5e4e(0x87a))/0x4)+parseInt(_0x3c5e4e(0x6a5))/0x5*(-parseInt(_0x3c5e4e(0x37b))/0x6)+-parseInt(_0x3c5e4e(0x716))/0x7*(-parseInt(_0x3c5e4e(0x777))/0x8)+parseInt(_0x3c5e4e(0x297))/0x9+parseInt(_0x3c5e4e(0x522))/0xa*(parseInt(_0x3c5e4e(0x271))/0xb)+-parseInt(_0x3c5e4e(0x980))/0xc*(parseInt(_0x3c5e4e(0x971))/0xd);if(_0x5cea2c===_0x3e4a3b)break;else _0x463070['push'](_0x463070['shift']());}catch(_0x72eee6){_0x463070['push'](_0x463070['shift']());}}}(_0x579a,0x245ae));var label=_0x4a5d62(0x2df),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x4645a5){const _0x4d75cc=_0x4a5d62;return _0x4645a5['status']&&_0x4645a5[_0x4d75cc(0x61b)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x4a5d62(0x7d0)]=VisuMZ[label][_0x4a5d62(0x7d0)]||{},VisuMZ[_0x4a5d62(0x512)]=function(_0x32d646,_0x4d36e4){const _0x1ffe9f=_0x4a5d62;for(const _0xf88c77 in _0x4d36e4){if(_0xf88c77[_0x1ffe9f(0x245)](/(.*):(.*)/i)){const _0xaa28a=String(RegExp['$1']),_0xa999ea=String(RegExp['$2'])[_0x1ffe9f(0x8be)]()['trim']();let _0x55090a,_0x83dd3b,_0x2ccfad;switch(_0xa999ea){case _0x1ffe9f(0x3f6):_0x55090a=_0x4d36e4[_0xf88c77]!==''?Number(_0x4d36e4[_0xf88c77]):0x0;break;case _0x1ffe9f(0x6b0):_0x83dd3b=_0x4d36e4[_0xf88c77]!==''?JSON[_0x1ffe9f(0x785)](_0x4d36e4[_0xf88c77]):[],_0x55090a=_0x83dd3b[_0x1ffe9f(0x714)](_0x4655fb=>Number(_0x4655fb));break;case _0x1ffe9f(0x6f0):_0x55090a=_0x4d36e4[_0xf88c77]!==''?eval(_0x4d36e4[_0xf88c77]):null;break;case'ARRAYEVAL':_0x83dd3b=_0x4d36e4[_0xf88c77]!==''?JSON['parse'](_0x4d36e4[_0xf88c77]):[],_0x55090a=_0x83dd3b[_0x1ffe9f(0x714)](_0x3c8935=>eval(_0x3c8935));break;case _0x1ffe9f(0x7e9):_0x55090a=_0x4d36e4[_0xf88c77]!==''?JSON['parse'](_0x4d36e4[_0xf88c77]):'';break;case _0x1ffe9f(0x605):_0x83dd3b=_0x4d36e4[_0xf88c77]!==''?JSON['parse'](_0x4d36e4[_0xf88c77]):[],_0x55090a=_0x83dd3b[_0x1ffe9f(0x714)](_0x546c80=>JSON[_0x1ffe9f(0x785)](_0x546c80));break;case'FUNC':_0x55090a=_0x4d36e4[_0xf88c77]!==''?new Function(JSON[_0x1ffe9f(0x785)](_0x4d36e4[_0xf88c77])):new Function('return\x200');break;case'ARRAYFUNC':_0x83dd3b=_0x4d36e4[_0xf88c77]!==''?JSON['parse'](_0x4d36e4[_0xf88c77]):[],_0x55090a=_0x83dd3b[_0x1ffe9f(0x714)](_0x317b3a=>new Function(JSON[_0x1ffe9f(0x785)](_0x317b3a)));break;case _0x1ffe9f(0x8d2):_0x55090a=_0x4d36e4[_0xf88c77]!==''?String(_0x4d36e4[_0xf88c77]):'';break;case _0x1ffe9f(0x8ec):_0x83dd3b=_0x4d36e4[_0xf88c77]!==''?JSON['parse'](_0x4d36e4[_0xf88c77]):[],_0x55090a=_0x83dd3b[_0x1ffe9f(0x714)](_0x37c6a4=>String(_0x37c6a4));break;case _0x1ffe9f(0x977):_0x2ccfad=_0x4d36e4[_0xf88c77]!==''?JSON['parse'](_0x4d36e4[_0xf88c77]):{},_0x32d646[_0xaa28a]={},VisuMZ['ConvertParams'](_0x32d646[_0xaa28a],_0x2ccfad);continue;case'ARRAYSTRUCT':_0x83dd3b=_0x4d36e4[_0xf88c77]!==''?JSON['parse'](_0x4d36e4[_0xf88c77]):[],_0x55090a=_0x83dd3b[_0x1ffe9f(0x714)](_0x35746e=>VisuMZ[_0x1ffe9f(0x512)]({},JSON[_0x1ffe9f(0x785)](_0x35746e)));break;default:continue;}_0x32d646[_0xaa28a]=_0x55090a;}}return _0x32d646;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x3fc)]=SceneManager['exit'],SceneManager[_0x4a5d62(0x6d4)]=function(){const _0x5ed213=_0x4a5d62;VisuMZ[_0x5ed213(0x2df)][_0x5ed213(0x3fc)]['call'](this);if(Utils[_0x5ed213(0x6cb)]>=_0x5ed213(0x2b0)){if(typeof nw===_0x5ed213(0x2a3))nw[_0x5ed213(0x842)][_0x5ed213(0x5db)]();}if(Utils[_0x5ed213(0x6cb)]>=_0x5ed213(0x1dd)){if(typeof nw===_0x5ed213(0x2a3))nw['App'][_0x5ed213(0x5db)]();}},(_0x1a1268=>{const _0x57814f=_0x4a5d62,_0x3b900e=_0x1a1268[_0x57814f(0x79f)];for(const _0x305b9f of dependencies){if(!Imported[_0x305b9f]){alert(_0x57814f(0x25e)[_0x57814f(0x807)](_0x3b900e,_0x305b9f)),SceneManager[_0x57814f(0x6d4)]();break;}}const _0x2a7c5b=_0x1a1268[_0x57814f(0x61b)];if(_0x2a7c5b[_0x57814f(0x245)](/\[Version[ ](.*?)\]/i)){const _0x2b27df=Number(RegExp['$1']);_0x2b27df!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x3b900e,_0x2b27df)),SceneManager[_0x57814f(0x6d4)]());}if(_0x2a7c5b[_0x57814f(0x245)](/\[Tier[ ](\d+)\]/i)){const _0x194810=Number(RegExp['$1']);_0x194810<tier?(alert(_0x57814f(0x1d7)[_0x57814f(0x807)](_0x3b900e,_0x194810,tier)),SceneManager['exit']()):tier=Math['max'](_0x194810,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x57814f(0x7d0)],_0x1a1268[_0x57814f(0x7a1)]);})(pluginData),((()=>{const _0x1c09ee=_0x4a5d62;if(VisuMZ['CoreEngine'][_0x1c09ee(0x7d0)][_0x1c09ee(0x235)]['SubfolderParse']??!![])for(const _0x333b8c in $plugins){const _0x5b6a8c=$plugins[_0x333b8c];_0x5b6a8c['name']['match'](/(.*)\/(.*)/i)&&(_0x5b6a8c['name']=String(RegExp['$2'][_0x1c09ee(0x5d4)]()));}})()),PluginManager[_0x4a5d62(0x798)](pluginData['name'],_0x4a5d62(0x404),_0x30467c=>{const _0x5c7d37=_0x4a5d62;if(!SceneManager[_0x5c7d37(0x7d2)])return;if(!SceneManager[_0x5c7d37(0x7d2)][_0x5c7d37(0x5f4)])return;VisuMZ[_0x5c7d37(0x512)](_0x30467c,_0x30467c);const _0x3b925f=Math[_0x5c7d37(0x372)](_0x30467c[_0x5c7d37(0x76a)]),_0x55d02f=Math[_0x5c7d37(0x372)](_0x30467c[_0x5c7d37(0x817)]);$gameTemp[_0x5c7d37(0x33d)](_0x3b925f,_0x55d02f,_0x30467c[_0x5c7d37(0x81c)],_0x30467c[_0x5c7d37(0x663)],_0x30467c[_0x5c7d37(0x63e)]);}),PluginManager[_0x4a5d62(0x798)](pluginData[_0x4a5d62(0x79f)],_0x4a5d62(0x3b7),_0x3c576f=>{const _0x9d9c45=_0x4a5d62;VisuMZ[_0x9d9c45(0x512)](_0x3c576f,_0x3c576f);const _0x5b23db=Math['round'](_0x3c576f[_0x9d9c45(0x4b3)])['clamp'](0x0,0x64),_0x35052c=AudioManager[_0x9d9c45(0x645)];_0x35052c&&(_0x35052c[_0x9d9c45(0x4b3)]=_0x5b23db,_0x35052c[_0x9d9c45(0x907)]=AudioManager[_0x9d9c45(0x7ca)][_0x9d9c45(0x72c)](),AudioManager['updateBgmParameters'](_0x35052c),AudioManager[_0x9d9c45(0x2e9)](_0x35052c,_0x35052c[_0x9d9c45(0x907)]),AudioManager[_0x9d9c45(0x7ca)][_0x9d9c45(0x2a0)](_0x35052c[_0x9d9c45(0x907)]));}),PluginManager[_0x4a5d62(0x798)](pluginData['name'],'AudioChangeBgmPitch',_0xe54962=>{const _0x1390c9=_0x4a5d62;VisuMZ[_0x1390c9(0x512)](_0xe54962,_0xe54962);const _0x4e3ddc=Math[_0x1390c9(0x372)](_0xe54962[_0x1390c9(0x330)])[_0x1390c9(0x95d)](0x32,0x96),_0x41417c=AudioManager[_0x1390c9(0x645)];_0x41417c&&(_0x41417c['pitch']=_0x4e3ddc,_0x41417c[_0x1390c9(0x907)]=AudioManager[_0x1390c9(0x7ca)]['seek'](),AudioManager[_0x1390c9(0x751)](_0x41417c),AudioManager[_0x1390c9(0x2e9)](_0x41417c,_0x41417c[_0x1390c9(0x907)]),AudioManager[_0x1390c9(0x7ca)]['_startPlaying'](_0x41417c[_0x1390c9(0x907)]));}),PluginManager[_0x4a5d62(0x798)](pluginData[_0x4a5d62(0x79f)],_0x4a5d62(0x4cd),_0x5de9b7=>{const _0x2c1995=_0x4a5d62;VisuMZ[_0x2c1995(0x512)](_0x5de9b7,_0x5de9b7);const _0x5a0415=Math['round'](_0x5de9b7[_0x2c1995(0x45e)])[_0x2c1995(0x95d)](-0x64,0x64),_0x44cd4b=AudioManager[_0x2c1995(0x645)];_0x44cd4b&&(_0x44cd4b[_0x2c1995(0x45e)]=_0x5a0415,_0x44cd4b['pos']=AudioManager[_0x2c1995(0x7ca)]['seek'](),AudioManager[_0x2c1995(0x751)](_0x44cd4b),AudioManager[_0x2c1995(0x2e9)](_0x44cd4b,_0x44cd4b[_0x2c1995(0x907)]),AudioManager[_0x2c1995(0x7ca)][_0x2c1995(0x2a0)](_0x44cd4b[_0x2c1995(0x907)]));}),PluginManager[_0x4a5d62(0x798)](pluginData[_0x4a5d62(0x79f)],_0x4a5d62(0x38f),_0x2bd89d=>{const _0x4fdf85=_0x4a5d62;VisuMZ[_0x4fdf85(0x512)](_0x2bd89d,_0x2bd89d);const _0x20c39b=Math[_0x4fdf85(0x372)](_0x2bd89d['volume'])[_0x4fdf85(0x95d)](0x0,0x64),_0x246c4d=AudioManager['_currentBgs'];_0x246c4d&&(_0x246c4d[_0x4fdf85(0x4b3)]=_0x20c39b,_0x246c4d[_0x4fdf85(0x907)]=AudioManager[_0x4fdf85(0x5e8)][_0x4fdf85(0x72c)](),AudioManager[_0x4fdf85(0x226)](_0x246c4d),AudioManager[_0x4fdf85(0x803)](_0x246c4d,_0x246c4d[_0x4fdf85(0x907)]),AudioManager[_0x4fdf85(0x5e8)][_0x4fdf85(0x2a0)](_0x246c4d[_0x4fdf85(0x907)]));}),PluginManager[_0x4a5d62(0x798)](pluginData[_0x4a5d62(0x79f)],_0x4a5d62(0x893),_0xa2c848=>{const _0x4fe888=_0x4a5d62;VisuMZ[_0x4fe888(0x512)](_0xa2c848,_0xa2c848);const _0x2697f5=Math[_0x4fe888(0x372)](_0xa2c848['pitch'])[_0x4fe888(0x95d)](0x32,0x96),_0x5c751c=AudioManager[_0x4fe888(0x726)];_0x5c751c&&(_0x5c751c[_0x4fe888(0x330)]=_0x2697f5,_0x5c751c[_0x4fe888(0x907)]=AudioManager[_0x4fe888(0x5e8)][_0x4fe888(0x72c)](),AudioManager[_0x4fe888(0x226)](_0x5c751c),AudioManager['playBgs'](_0x5c751c,_0x5c751c[_0x4fe888(0x907)]),AudioManager[_0x4fe888(0x5e8)][_0x4fe888(0x2a0)](_0x5c751c[_0x4fe888(0x907)]));}),PluginManager[_0x4a5d62(0x798)](pluginData['name'],_0x4a5d62(0x22c),_0x5ee707=>{const _0x563565=_0x4a5d62;VisuMZ[_0x563565(0x512)](_0x5ee707,_0x5ee707);const _0xdeeaca=Math['round'](_0x5ee707[_0x563565(0x45e)])[_0x563565(0x95d)](-0x64,0x64),_0x1e84ef=AudioManager[_0x563565(0x726)];_0x1e84ef&&(_0x1e84ef[_0x563565(0x45e)]=_0xdeeaca,_0x1e84ef['pos']=AudioManager[_0x563565(0x5e8)]['seek'](),AudioManager[_0x563565(0x226)](_0x1e84ef),AudioManager['playBgs'](_0x1e84ef,_0x1e84ef[_0x563565(0x907)]),AudioManager[_0x563565(0x5e8)][_0x563565(0x2a0)](_0x1e84ef['pos']));}),PluginManager[_0x4a5d62(0x798)](pluginData[_0x4a5d62(0x79f)],_0x4a5d62(0x502),_0x1f98b=>{const _0x1b8deb=_0x4a5d62;if(!$gameTemp['isPlaytest']())return;const _0x8e323e=Input[_0x1b8deb(0x59e)]();console[_0x1b8deb(0x5f5)](_0x8e323e);}),PluginManager['registerCommand'](pluginData[_0x4a5d62(0x79f)],'ExportAllMapText',_0x5020e5=>{const _0x36ca55=_0x4a5d62;if(!$gameTemp[_0x36ca55(0x84c)]())return;if(!Utils[_0x36ca55(0x220)]())return;SceneManager['_scene'][_0x36ca55(0x242)]=![],VisuMZ[_0x36ca55(0x2df)][_0x36ca55(0x48f)]();}),PluginManager[_0x4a5d62(0x798)](pluginData[_0x4a5d62(0x79f)],_0x4a5d62(0x389),_0x4ff09f=>{const _0x528cb5=_0x4a5d62;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x528cb5(0x220)]())return;SceneManager[_0x528cb5(0x7d2)][_0x528cb5(0x242)]=![],VisuMZ[_0x528cb5(0x2df)][_0x528cb5(0x5c1)]();}),PluginManager[_0x4a5d62(0x798)](pluginData[_0x4a5d62(0x79f)],_0x4a5d62(0x45b),_0x4edbdb=>{const _0x82600a=_0x4a5d62;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;if(!$gameMap)return;if($gameMap[_0x82600a(0x2d0)]()<=0x0)return;VisuMZ[_0x82600a(0x512)](_0x4edbdb,_0x4edbdb);const _0x54b9ec=_0x82600a(0x87b)['format']($gameMap[_0x82600a(0x2d0)]()[_0x82600a(0x4b7)](0x3)),_0x3838de=VisuMZ['CoreEngine'][_0x82600a(0x3a7)]($gameMap[_0x82600a(0x2d0)]());VisuMZ[_0x82600a(0x2df)]['ExportString'](_0x3838de,_0x54b9ec,!![]);}),PluginManager[_0x4a5d62(0x798)](pluginData['name'],_0x4a5d62(0x8fd),_0x540538=>{const _0x5f1753=_0x4a5d62;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x5f1753(0x220)]())return;if(!$gameParty['inBattle']())return;VisuMZ[_0x5f1753(0x512)](_0x540538,_0x540538);const _0x228a3a=_0x5f1753(0x537)['format']($gameTroop['_troopId'][_0x5f1753(0x4b7)](0x4)),_0x1cf2c2=VisuMZ[_0x5f1753(0x2df)][_0x5f1753(0x966)]($gameTroop[_0x5f1753(0x4ba)]);VisuMZ[_0x5f1753(0x2df)][_0x5f1753(0x894)](_0x1cf2c2,_0x228a3a,!![]);}),VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x894)]=function(_0x299461,_0x2da1c9,_0x4f7a30){const _0x4bb35e=_0x4a5d62,_0x3dbec9=require('fs');let _0x2eb8d6=_0x4bb35e(0x66f)[_0x4bb35e(0x807)](_0x2da1c9||'0');_0x3dbec9[_0x4bb35e(0x74b)](_0x2eb8d6,_0x299461,_0x53676e=>{const _0x5cf369=_0x4bb35e;if(_0x53676e)throw err;else _0x4f7a30&&alert(_0x5cf369(0x44e)[_0x5cf369(0x807)](_0x2eb8d6));});},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x48f)]=function(){const _0x126220=_0x4a5d62,_0x155247=[];for(const _0x4e48ec of $dataMapInfos){if(!_0x4e48ec)continue;_0x155247[_0x126220(0x98c)](_0x4e48ec['id']);}const _0x3fc35e=_0x155247['length']*0x64+Math[_0x126220(0x60a)](0x64);alert(_0x126220(0x49e)[_0x126220(0x807)](_0x3fc35e)),this[_0x126220(0x4c5)]=[],this[_0x126220(0x5fc)]=$dataMap;for(const _0x5e0b1e of _0x155247){VisuMZ[_0x126220(0x2df)][_0x126220(0x7fd)](_0x5e0b1e);}setTimeout(VisuMZ[_0x126220(0x2df)][_0x126220(0x340)]['bind'](this),_0x3fc35e);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x7fd)]=function(_0x22187c){const _0x16e4bf=_0x4a5d62,_0x5182b2='Map%1.json'[_0x16e4bf(0x807)](_0x22187c[_0x16e4bf(0x4b7)](0x3)),_0x49bcb7=new XMLHttpRequest(),_0xc4719b=_0x16e4bf(0x289)+_0x5182b2;_0x49bcb7['open'](_0x16e4bf(0x9a5),_0xc4719b),_0x49bcb7[_0x16e4bf(0x98a)]('application/json'),_0x49bcb7[_0x16e4bf(0x7ee)]=()=>this[_0x16e4bf(0x1b4)](_0x49bcb7,_0x22187c,_0x5182b2,_0xc4719b),_0x49bcb7[_0x16e4bf(0x1e9)]=()=>DataManager[_0x16e4bf(0x3d7)](_0x16e4bf(0x6af),_0x5182b2,_0xc4719b),_0x49bcb7[_0x16e4bf(0x8c6)]();},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x1b4)]=function(_0x1315f0,_0x4d7ff9,_0x585144,_0x35a8ae){const _0x4f5fb0=_0x4a5d62;$dataMap=JSON[_0x4f5fb0(0x785)](_0x1315f0['responseText']),DataManager['onLoad']($dataMap),this[_0x4f5fb0(0x4c5)][_0x4d7ff9]=VisuMZ['CoreEngine'][_0x4f5fb0(0x3a7)](_0x4d7ff9),$dataMap=this[_0x4f5fb0(0x5fc)];},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x340)]=function(){const _0x423f58=_0x4a5d62,_0x411319='AllMaps';this[_0x423f58(0x4c5)]['remove'](undefined)[_0x423f58(0x39a)]('')[_0x423f58(0x39a)](null);const _0x1e9d43=this[_0x423f58(0x4c5)][_0x423f58(0x304)](_0x423f58(0x7f6))[_0x423f58(0x5d4)]();VisuMZ[_0x423f58(0x2df)][_0x423f58(0x894)](_0x1e9d43,_0x411319,!![]),SceneManager[_0x423f58(0x7d2)][_0x423f58(0x242)]=!![];},VisuMZ[_0x4a5d62(0x2df)]['ExtractStrFromMap']=function(_0x5110f6){const _0x24aa7b=_0x4a5d62;if(!$dataMap)return'';let _0x5a8715='█'[_0x24aa7b(0x82a)](0x46)+'\x0a\x0a',_0x41417d='═'[_0x24aa7b(0x82a)](0x46)+'\x0a\x0a',_0x16e1e1='';this[_0x24aa7b(0x19d)]=0x0;for(const _0x34831f of $dataMap[_0x24aa7b(0x6c0)]){if(!_0x34831f)continue;let _0x206e80=_0x34831f['id'],_0x4d7a2b=_0x34831f[_0x24aa7b(0x79f)],_0x73aca7=_0x34831f[_0x24aa7b(0x565)];for(const _0x71db58 of _0x73aca7){const _0x41c13d=_0x73aca7[_0x24aa7b(0x606)](_0x71db58)+0x1;let _0x582c5a=_0x41417d+_0x24aa7b(0x86f),_0x2b5d7c=VisuMZ[_0x24aa7b(0x2df)][_0x24aa7b(0x868)](_0x71db58[_0x24aa7b(0x56a)]);if(_0x2b5d7c[_0x24aa7b(0x6d1)]>0x0){if(_0x16e1e1[_0x24aa7b(0x6d1)]>0x0)_0x16e1e1+=_0x41417d+'\x0a\x0a\x0a\x0a\x0a';else{const _0x4af69c=$dataMapInfos[_0x5110f6][_0x24aa7b(0x79f)];_0x16e1e1+=_0x5a8715+_0x24aa7b(0x2bb)[_0x24aa7b(0x807)](_0x5110f6,_0x4af69c||_0x24aa7b(0x7b6))+_0x5a8715;}_0x16e1e1+=_0x582c5a[_0x24aa7b(0x807)](_0x206e80,_0x4d7a2b,_0x41c13d,_0x2b5d7c);}}}return _0x16e1e1['length']>0x0&&(_0x16e1e1+=_0x41417d),_0x16e1e1;},VisuMZ['CoreEngine'][_0x4a5d62(0x5c1)]=function(){const _0x2d6514=_0x4a5d62,_0x44ca61=$dataTroops['length']*0xa+Math[_0x2d6514(0x60a)](0xa);alert(_0x2d6514(0x243)[_0x2d6514(0x807)](_0x44ca61));const _0x53f855=[];for(const _0x14af13 of $dataTroops){if(!_0x14af13)continue;const _0x208347=_0x14af13['id'];_0x53f855[_0x208347]=VisuMZ['CoreEngine'][_0x2d6514(0x966)](_0x208347);}setTimeout(VisuMZ[_0x2d6514(0x2df)][_0x2d6514(0x3b8)][_0x2d6514(0x37c)](this,_0x53f855),_0x44ca61);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x966)]=function(_0x4381d9){const _0x1ca976=_0x4a5d62;if(!$dataTroops[_0x4381d9])return'';let _0x488e5e='█'['repeat'](0x46)+'\x0a\x0a',_0x4fd3b1='═'[_0x1ca976(0x82a)](0x46)+'\x0a\x0a',_0x149d98='';this[_0x1ca976(0x19d)]=0x0;const _0xd41b6c=$dataTroops[_0x4381d9];let _0x5c66c3=_0xd41b6c[_0x1ca976(0x565)];for(const _0x2cfc8f of _0x5c66c3){const _0x1bc39e=_0x5c66c3[_0x1ca976(0x606)](_0x2cfc8f)+0x1;let _0xa1312b=_0x4fd3b1+_0x1ca976(0x7c0),_0x4c6ad8=VisuMZ['CoreEngine'][_0x1ca976(0x868)](_0x2cfc8f[_0x1ca976(0x56a)]);_0x4c6ad8[_0x1ca976(0x6d1)]>0x0&&(_0x149d98['length']>0x0?_0x149d98+=_0x4fd3b1+_0x1ca976(0x7f6):_0x149d98+=_0x488e5e+_0x1ca976(0x2ec)['format'](_0x4381d9,_0xd41b6c[_0x1ca976(0x79f)]||_0x1ca976(0x7b6))+_0x488e5e,_0x149d98+=_0xa1312b[_0x1ca976(0x807)](_0x1bc39e,_0x4c6ad8));}return _0x149d98[_0x1ca976(0x6d1)]>0x0&&(_0x149d98+=_0x4fd3b1),_0x149d98;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x3b8)]=function(_0x13e227){const _0xa1bc45=_0x4a5d62,_0x440fbf=_0xa1bc45(0x2b3);_0x13e227['remove'](undefined)['remove']('')[_0xa1bc45(0x39a)](null);const _0x485c2f=_0x13e227[_0xa1bc45(0x304)](_0xa1bc45(0x7f6))['trim']();VisuMZ[_0xa1bc45(0x2df)][_0xa1bc45(0x894)](_0x485c2f,_0x440fbf,!![]),SceneManager['_scene']['_active']=!![];},VisuMZ[_0x4a5d62(0x2df)]['ExtractStrFromList']=function(_0x578366){const _0x3c74cb=_0x4a5d62;let _0x23f1c0='\x0a'+'─'[_0x3c74cb(0x82a)](0x46)+'\x0a',_0x69e315='\x0a'+'┄'[_0x3c74cb(0x82a)](0x46)+'\x0a',_0x21aee1='';for(const _0xa3de74 of _0x578366){if(!_0xa3de74)continue;if(_0xa3de74[_0x3c74cb(0x74f)]===0x65)_0x21aee1+=_0x23f1c0+'\x0a',_0x21aee1+='〘Show\x20Text〙\x0a',_0xa3de74[_0x3c74cb(0x7a1)][0x4]!==''&&_0xa3de74['parameters'][0x4]!==undefined&&(_0x21aee1+='【%1】\x0a'['format'](_0xa3de74['parameters'][0x4]));else{if(_0xa3de74[_0x3c74cb(0x74f)]===0x191)_0x21aee1+=_0x3c74cb(0x28e)[_0x3c74cb(0x807)](_0xa3de74['parameters'][0x0]);else{if(_0xa3de74[_0x3c74cb(0x74f)]===0x192)_0x21aee1+=_0x23f1c0,_0x21aee1+=_0x3c74cb(0x4f5)['format'](_0x69e315,_0xa3de74[_0x3c74cb(0x7a1)][0x0]+0x1,_0xa3de74['parameters'][0x1]);else{if(_0xa3de74['code']===0x193)_0x21aee1+=_0x23f1c0,_0x21aee1+=_0x3c74cb(0x85b)[_0x3c74cb(0x807)](_0x69e315);else{if(_0xa3de74[_0x3c74cb(0x74f)]===0x194)_0x21aee1+=_0x23f1c0,_0x21aee1+=_0x3c74cb(0x5f0)[_0x3c74cb(0x807)](_0x69e315);else{if(_0xa3de74[_0x3c74cb(0x74f)]===0x69)_0x21aee1+=_0x23f1c0+'\x0a',_0x21aee1+=_0x3c74cb(0x288);else{if(_0xa3de74[_0x3c74cb(0x74f)]===0x6c)_0x21aee1+=_0x23f1c0+'\x0a',_0x21aee1+=_0x3c74cb(0x253)[_0x3c74cb(0x807)](_0xa3de74['parameters'][0x0]);else{if(_0xa3de74[_0x3c74cb(0x74f)]===0x198)_0x21aee1+=_0x3c74cb(0x28e)['format'](_0xa3de74[_0x3c74cb(0x7a1)][0x0]);else{if(_0xa3de74['code']===0x75){const _0x457ad2=$dataCommonEvents[_0xa3de74[_0x3c74cb(0x7a1)][0x0]];if(_0x457ad2&&this[_0x3c74cb(0x19d)]<=0xa){this[_0x3c74cb(0x19d)]++;let _0x17acde=VisuMZ[_0x3c74cb(0x2df)][_0x3c74cb(0x868)](_0x457ad2['list']);_0x17acde['length']>0x0&&(_0x21aee1+=_0x23f1c0,_0x21aee1+=_0x69e315,_0x21aee1+=_0x3c74cb(0x415)[_0x3c74cb(0x807)](_0x457ad2['id'],_0x457ad2[_0x3c74cb(0x79f)]),_0x21aee1+=_0x69e315,_0x21aee1+=_0x17acde,_0x21aee1+=_0x69e315,_0x21aee1+=_0x3c74cb(0x4eb)['format'](_0x457ad2['id'],_0x457ad2[_0x3c74cb(0x79f)]),_0x21aee1+=_0x69e315),this['_commonEventLayers']--;}}}}}}}}}}}return _0x21aee1['length']>0x0&&(_0x21aee1+=_0x23f1c0),_0x21aee1;},PluginManager['registerCommand'](pluginData['name'],_0x4a5d62(0x2ef),_0x407ea2=>{const _0x2a901f=_0x4a5d62;VisuMZ[_0x2a901f(0x512)](_0x407ea2,_0x407ea2);const _0x31bf05=_0x407ea2['URL'];VisuMZ[_0x2a901f(0x71b)](_0x31bf05);}),PluginManager[_0x4a5d62(0x798)](pluginData[_0x4a5d62(0x79f)],_0x4a5d62(0x99c),_0x3114a2=>{const _0x321377=_0x4a5d62;VisuMZ['ConvertParams'](_0x3114a2,_0x3114a2);const _0x5dae91=_0x3114a2[_0x321377(0x6d3)]||0x0;$gameParty[_0x321377(0x750)](_0x5dae91);}),PluginManager[_0x4a5d62(0x798)](pluginData[_0x4a5d62(0x79f)],_0x4a5d62(0x521),_0x4377bc=>{const _0x2ffdf5=_0x4a5d62;if(!SceneManager['isSceneMap']())return;VisuMZ[_0x2ffdf5(0x512)](_0x4377bc,_0x4377bc);const _0x4cd24a=_0x4377bc['CommonEventID'];SceneManager[_0x2ffdf5(0x7d2)][_0x2ffdf5(0x604)](_0x4cd24a);}),PluginManager[_0x4a5d62(0x798)](pluginData[_0x4a5d62(0x79f)],_0x4a5d62(0x49f),_0x1f3e63=>{const _0x387bb0=_0x4a5d62;if(!$gameTemp[_0x387bb0(0x84c)]())return;if(!Utils[_0x387bb0(0x220)]())return;VisuMZ[_0x387bb0(0x512)](_0x1f3e63,_0x1f3e63);const _0x210455=_0x1f3e63[_0x387bb0(0x5d1)]||0x1;$gameTemp[_0x387bb0(0x21e)]=_0x210455;}),PluginManager['registerCommand'](pluginData['name'],_0x4a5d62(0x40d),_0x17a436=>{const _0x553d81=_0x4a5d62;VisuMZ[_0x553d81(0x512)](_0x17a436,_0x17a436);const _0x5adb7b=_0x17a436[_0x553d81(0x808)]||0x1,_0x447e3c=_0x17a436[_0x553d81(0x693)]||'Linear',_0x59443a=$gameScreen['picture'](_0x5adb7b);_0x59443a&&_0x59443a[_0x553d81(0x5d9)](_0x447e3c);}),PluginManager['registerCommand'](pluginData[_0x4a5d62(0x79f)],'PictureEraseAll',_0x2d970b=>{const _0x18ea03=_0x4a5d62;for(let _0x19e365=0x1;_0x19e365<=$gameScreen[_0x18ea03(0x229)]();_0x19e365++){$gameScreen['erasePicture'](_0x19e365);}}),PluginManager[_0x4a5d62(0x798)](pluginData[_0x4a5d62(0x79f)],_0x4a5d62(0x98d),_0x4522c5=>{const _0x3b9e06=_0x4a5d62;VisuMZ[_0x3b9e06(0x512)](_0x4522c5,_0x4522c5);const _0x5f235b=Math['min'](_0x4522c5['StartID'],_0x4522c5[_0x3b9e06(0x211)]),_0x407fee=Math[_0x3b9e06(0x4ef)](_0x4522c5['StartID'],_0x4522c5['EndingID']);for(let _0x2426e6=_0x5f235b;_0x2426e6<=_0x407fee;_0x2426e6++){$gameScreen[_0x3b9e06(0x311)](_0x2426e6);}}),PluginManager[_0x4a5d62(0x798)](pluginData['name'],_0x4a5d62(0x25b),_0xedc3d4=>{const _0x10aed1=_0x4a5d62;VisuMZ[_0x10aed1(0x512)](_0xedc3d4,_0xedc3d4);const _0x260237=Math[_0x10aed1(0x372)](_0xedc3d4['PictureID'])[_0x10aed1(0x95d)](0x1,0x64),_0x584f79=-Number(_0xedc3d4['AdjustAngle']||0x0),_0x355b1b=Math['max'](_0xedc3d4[_0x10aed1(0x354)]||0x0,0x0),_0x397b32=_0xedc3d4[_0x10aed1(0x693)]||_0x10aed1(0x1b6),_0x58f15d=_0xedc3d4[_0x10aed1(0x92b)],_0x3709b5=$gameScreen[_0x10aed1(0x3fe)](_0x260237);if(!_0x3709b5)return;_0x3709b5[_0x10aed1(0x8d8)](_0x584f79,_0x355b1b,_0x397b32);if(_0x58f15d){const _0xbfece5=$gameTemp[_0x10aed1(0x620)]();if(_0xbfece5)_0xbfece5[_0x10aed1(0x8b7)](_0x355b1b);}}),PluginManager[_0x4a5d62(0x798)](pluginData['name'],_0x4a5d62(0x9a3),_0x1d0894=>{const _0x593d80=_0x4a5d62;VisuMZ[_0x593d80(0x512)](_0x1d0894,_0x1d0894);const _0xa21ed3=Math[_0x593d80(0x372)](_0x1d0894[_0x593d80(0x5d1)])[_0x593d80(0x95d)](0x1,0x64),_0x10e792=-Number(_0x1d0894[_0x593d80(0x457)]||0x0),_0x476028=Math[_0x593d80(0x4ef)](_0x1d0894[_0x593d80(0x354)]||0x0,0x0),_0x5f45f0=_0x1d0894[_0x593d80(0x693)]||_0x593d80(0x1b6),_0x4d4243=_0x1d0894[_0x593d80(0x92b)],_0x2321ea=$gameScreen['picture'](_0xa21ed3);if(!_0x2321ea)return;_0x2321ea['setAnglePlusData'](_0x10e792,_0x476028,_0x5f45f0);if(_0x4d4243){const _0x3c8f47=$gameTemp['getLastPluginCommandInterpreter']();if(_0x3c8f47)_0x3c8f47[_0x593d80(0x8b7)](_0x476028);}}),PluginManager[_0x4a5d62(0x798)](pluginData[_0x4a5d62(0x79f)],_0x4a5d62(0x4d1),_0x33989d=>{const _0x818c58=_0x4a5d62;VisuMZ[_0x818c58(0x512)](_0x33989d,_0x33989d);const _0x3f1f85=Math[_0x818c58(0x372)](_0x33989d['PictureID'])['clamp'](0x1,0x64),_0x3cdd10=_0x33989d[_0x818c58(0x7d0)],_0x3a1d7f=_0x3cdd10[_0x818c58(0x3ee)][_0x818c58(0x95d)](0x0,0x1),_0x29654f=Math['round'](_0x3cdd10['PositionX']||0x0),_0x1f1673=Math['round'](_0x3cdd10[_0x818c58(0x3fa)]||0x0),_0x294540=Math[_0x818c58(0x372)](_0x3cdd10['ScaleX']||0x0),_0x2e73e2=Math[_0x818c58(0x372)](_0x3cdd10[_0x818c58(0x772)]||0x0),_0x5ea6c0=Math[_0x818c58(0x372)](_0x3cdd10[_0x818c58(0x870)])[_0x818c58(0x95d)](0x0,0xff),_0x2be9e3=_0x3cdd10[_0x818c58(0x641)],_0x4352c0='VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2',_0x4540b9=_0x33989d[_0x818c58(0x208)]?_0x818c58(0x208):_0x818c58(0x665),_0x4aad87=_0x4352c0[_0x818c58(0x807)](_0x33989d[_0x818c58(0x3ff)],_0x4540b9);$gameScreen[_0x818c58(0x223)](_0x3f1f85,_0x4aad87,_0x3a1d7f,_0x29654f,_0x1f1673,_0x294540,_0x2e73e2,_0x5ea6c0,_0x2be9e3);}),PluginManager[_0x4a5d62(0x798)](pluginData[_0x4a5d62(0x79f)],_0x4a5d62(0x5ca),_0x50735f=>{const _0x45de5b=_0x4a5d62;VisuMZ[_0x45de5b(0x512)](_0x50735f,_0x50735f);const _0x44e2b2=_0x50735f[_0x45de5b(0x4f9)]||_0x45de5b(0x1cf),_0x34bece=_0x50735f[_0x45de5b(0x1b5)]['clamp'](0x1,0x9),_0x121858=_0x50735f[_0x45de5b(0x22f)][_0x45de5b(0x95d)](0x1,0x9),_0x2b3f34=_0x50735f['Duration']||0x1,_0x41493c=_0x50735f[_0x45de5b(0x92b)];$gameScreen[_0x45de5b(0x719)](_0x44e2b2),$gameScreen[_0x45de5b(0x635)](_0x34bece,_0x121858,_0x2b3f34);if(_0x41493c){const _0x305f9f=$gameTemp[_0x45de5b(0x620)]();if(_0x305f9f)_0x305f9f['wait'](_0x2b3f34);}}),PluginManager[_0x4a5d62(0x798)](pluginData['name'],_0x4a5d62(0x47f),_0x4c9e3d=>{const _0x33e653=_0x4a5d62;if($gameParty[_0x33e653(0x7a2)]())return;VisuMZ['ConvertParams'](_0x4c9e3d,_0x4c9e3d);const _0x38d9ab=_0x4c9e3d['IDs'],_0xdb9bee=(_0x4c9e3d['Chance']||0x0)/0x64;for(const _0x4a402e of _0x38d9ab){const _0x109c7e=Math[_0x33e653(0x1cf)]()<=_0xdb9bee;$gameSwitches['setValue'](_0x4a402e,_0x109c7e);}}),PluginManager[_0x4a5d62(0x798)](pluginData[_0x4a5d62(0x79f)],_0x4a5d62(0x27b),_0x5e5b32=>{const _0x539ccd=_0x4a5d62;if($gameParty[_0x539ccd(0x7a2)]())return;VisuMZ[_0x539ccd(0x512)](_0x5e5b32,_0x5e5b32);const _0x5aa722=Math[_0x539ccd(0x8df)](_0x5e5b32[_0x539ccd(0x8a9)],_0x5e5b32['EndingID']),_0x35af18=Math[_0x539ccd(0x4ef)](_0x5e5b32[_0x539ccd(0x8a9)],_0x5e5b32[_0x539ccd(0x211)]),_0xf1170b=(_0x5e5b32['Chance']||0x0)/0x64;for(let _0xb30cad=_0x5aa722;_0xb30cad<=_0x35af18;_0xb30cad++){const _0x4c8954=Math[_0x539ccd(0x1cf)]()<=_0xf1170b;$gameSwitches[_0x539ccd(0x1d1)](_0xb30cad,_0x4c8954);}}),PluginManager[_0x4a5d62(0x798)](pluginData['name'],_0x4a5d62(0x8c0),_0x15448b=>{const _0x33228b=_0x4a5d62;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x15448b,_0x15448b);const _0x40a0eb=_0x15448b['IDs'];for(const _0x1543c6 of _0x40a0eb){const _0x44f062=$gameSwitches['value'](_0x1543c6);$gameSwitches[_0x33228b(0x1d1)](_0x1543c6,!_0x44f062);}}),PluginManager['registerCommand'](pluginData[_0x4a5d62(0x79f)],_0x4a5d62(0x3a0),_0x139f6c=>{const _0xbe6bc=_0x4a5d62;if($gameParty[_0xbe6bc(0x7a2)]())return;VisuMZ[_0xbe6bc(0x512)](_0x139f6c,_0x139f6c);const _0x5976d6=Math['min'](_0x139f6c[_0xbe6bc(0x8a9)],_0x139f6c['EndingID']),_0x35f147=Math[_0xbe6bc(0x4ef)](_0x139f6c[_0xbe6bc(0x8a9)],_0x139f6c[_0xbe6bc(0x211)]);for(let _0x1e46e2=_0x5976d6;_0x1e46e2<=_0x35f147;_0x1e46e2++){const _0x35497d=$gameSwitches['value'](_0x1e46e2);$gameSwitches[_0xbe6bc(0x1d1)](_0x1e46e2,!_0x35497d);}}),PluginManager['registerCommand'](pluginData['name'],'SystemSetFontSize',_0x569048=>{const _0x190888=_0x4a5d62;VisuMZ[_0x190888(0x512)](_0x569048,_0x569048);const _0x1044e3=_0x569048[_0x190888(0x593)]||0x1;$gameSystem['setMainFontSize'](_0x1044e3);}),PluginManager[_0x4a5d62(0x798)](pluginData['name'],_0x4a5d62(0x84f),_0x39c8d3=>{const _0x93b2fb=_0x4a5d62;if($gameParty[_0x93b2fb(0x7a2)]())return;VisuMZ[_0x93b2fb(0x512)](_0x39c8d3,_0x39c8d3);const _0x3ed503=_0x39c8d3[_0x93b2fb(0x593)];if(_0x3ed503[_0x93b2fb(0x245)](/Front/i))$gameSystem[_0x93b2fb(0x325)](![]);else _0x3ed503[_0x93b2fb(0x245)](/Side/i)?$gameSystem[_0x93b2fb(0x325)](!![]):$gameSystem[_0x93b2fb(0x325)](!$gameSystem[_0x93b2fb(0x946)]());}),PluginManager[_0x4a5d62(0x798)](pluginData[_0x4a5d62(0x79f)],_0x4a5d62(0x615),_0x47aa3a=>{const _0xdc2cba=_0x4a5d62;if($gameParty[_0xdc2cba(0x7a2)]())return;VisuMZ[_0xdc2cba(0x512)](_0x47aa3a,_0x47aa3a);const _0x5c85ef=[_0xdc2cba(0x3e2),'bgs','me','se'];for(const _0x198d29 of _0x5c85ef){const _0x21f924=_0x47aa3a[_0x198d29],_0x3a583a=_0xdc2cba(0x692)[_0xdc2cba(0x807)](_0x198d29);for(const _0x1da4ff of _0x21f924){AudioManager[_0xdc2cba(0x3af)](_0x3a583a,_0x1da4ff);}}}),PluginManager[_0x4a5d62(0x798)](pluginData['name'],_0x4a5d62(0x6e2),_0x4bd018=>{const _0x28233e=_0x4a5d62;if($gameParty['inBattle']())return;VisuMZ[_0x28233e(0x512)](_0x4bd018,_0x4bd018);const _0x4432c0=['animations',_0x28233e(0x2cc),'battlebacks2','characters',_0x28233e(0x51a),'faces',_0x28233e(0x2ff),_0x28233e(0x990),_0x28233e(0x83e),_0x28233e(0x296),_0x28233e(0x35a),'tilesets',_0x28233e(0x7db),'titles2'];for(const _0x5c8f64 of _0x4432c0){const _0x310256=_0x4bd018[_0x5c8f64],_0x48835b='img/%1/'[_0x28233e(0x807)](_0x5c8f64);for(const _0x2b6e08 of _0x310256){ImageManager[_0x28233e(0x496)](_0x48835b,_0x2b6e08);}}}),PluginManager[_0x4a5d62(0x798)](pluginData[_0x4a5d62(0x79f)],_0x4a5d62(0x369),_0x261188=>{const _0x38d86d=_0x4a5d62;if($gameParty[_0x38d86d(0x7a2)]())return;VisuMZ[_0x38d86d(0x512)](_0x261188,_0x261188);const _0x11eaab=_0x261188[_0x38d86d(0x593)]['toUpperCase']()['trim'](),_0x5ef751=VisuMZ['CoreEngine'][_0x38d86d(0x61a)](_0x11eaab);$gameSystem[_0x38d86d(0x52f)](_0x5ef751);}),VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x61a)]=function(_0x388a2f){const _0x50d9c9=_0x4a5d62;_0x388a2f=_0x388a2f||'DATABASE',_0x388a2f=String(_0x388a2f)[_0x50d9c9(0x8be)]()[_0x50d9c9(0x5d4)]();switch(_0x388a2f){case _0x50d9c9(0x1c6):return 0x0;case'TPB\x20ACTIVE':return 0x1;case _0x50d9c9(0x487):return 0x2;case _0x50d9c9(0x95a):if(Imported[_0x50d9c9(0x8b9)])return'CTB';break;case _0x50d9c9(0x7d9):if(Imported[_0x50d9c9(0x4f2)])return'STB';break;case _0x50d9c9(0x64c):if(Imported['VisuMZ_2_BattleSystemBTB'])return _0x50d9c9(0x64c);break;case _0x50d9c9(0x498):if(Imported['VisuMZ_2_BattleSystemFTB'])return _0x50d9c9(0x498);break;case'OTB':if(Imported[_0x50d9c9(0x725)])return _0x50d9c9(0x40a);break;case _0x50d9c9(0x6c2):if(Imported[_0x50d9c9(0x874)])return _0x50d9c9(0x6c2);break;case _0x50d9c9(0x363):if(Imported[_0x50d9c9(0x618)])return _0x50d9c9(0x363);break;}return $dataSystem['battleSystem'];},PluginManager[_0x4a5d62(0x798)](pluginData[_0x4a5d62(0x79f)],_0x4a5d62(0x3c0),_0x2a1f75=>{const _0x44be44=_0x4a5d62;VisuMZ['ConvertParams'](_0x2a1f75,_0x2a1f75);const _0xa794f4=_0x2a1f75['option']||0x1;$gameSystem[_0x44be44(0x6b4)](_0xa794f4);}),PluginManager['registerCommand'](pluginData['name'],_0x4a5d62(0x68c),_0x680421=>{const _0x413ec4=_0x4a5d62;VisuMZ['ConvertParams'](_0x680421,_0x680421);const _0x271dac=_0x680421[_0x413ec4(0x7d4)]||'';$textPopup(_0x271dac);}),PluginManager[_0x4a5d62(0x798)](pluginData['name'],_0x4a5d62(0x767),_0x58fcfc=>{const _0x4b12ca=_0x4a5d62;VisuMZ[_0x4b12ca(0x512)](_0x58fcfc,_0x58fcfc);const _0x20c39a=_0x58fcfc['id']||0x1,_0x2e0b63=_0x58fcfc[_0x4b12ca(0x2c5)],_0x311d15=_0x58fcfc['operand']||0x0;let _0x1023cd=$gameVariables[_0x4b12ca(0x6d3)](_0x20c39a)||0x0;switch(_0x2e0b63){case'=':_0x1023cd=_0x311d15;break;case'+':_0x1023cd+=_0x311d15;break;case'-':_0x1023cd-=_0x311d15;break;case'*':_0x1023cd*=_0x311d15;break;case'/':_0x1023cd/=_0x311d15;break;case'%':_0x1023cd%=_0x311d15;break;}_0x1023cd=_0x1023cd||0x0,$gameVariables[_0x4b12ca(0x1d1)](_0x20c39a,_0x1023cd);}),PluginManager[_0x4a5d62(0x798)](pluginData[_0x4a5d62(0x79f)],_0x4a5d62(0x1fc),_0x43f2f8=>{const _0x113068=_0x4a5d62;VisuMZ[_0x113068(0x512)](_0x43f2f8,_0x43f2f8);const _0x4c6c42=_0x43f2f8['id']()||0x1,_0x2a1fc4=_0x43f2f8[_0x113068(0x2c5)],_0x3df571=_0x43f2f8[_0x113068(0x831)]()||0x0;let _0x2a4211=$gameVariables[_0x113068(0x6d3)](_0x4c6c42)||0x0;switch(_0x2a1fc4){case'=':_0x2a4211=_0x3df571;break;case'+':_0x2a4211+=_0x3df571;break;case'-':_0x2a4211-=_0x3df571;break;case'*':_0x2a4211*=_0x3df571;break;case'/':_0x2a4211/=_0x3df571;break;case'%':_0x2a4211%=_0x3df571;break;}_0x2a4211=_0x2a4211||0x0,$gameVariables['setValue'](_0x4c6c42,_0x2a4211);}),VisuMZ[_0x4a5d62(0x2df)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype'][_0x4a5d62(0x1c4)],Scene_Boot['prototype'][_0x4a5d62(0x1c4)]=function(){const _0x454efb=_0x4a5d62;VisuMZ[_0x454efb(0x2df)]['Scene_Boot_onDatabaseLoaded'][_0x454efb(0x35f)](this),this[_0x454efb(0x33a)](),this[_0x454efb(0x307)](),this[_0x454efb(0x6cc)](),this[_0x454efb(0x79e)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),this[_0x454efb(0x52c)](),VisuMZ[_0x454efb(0x48a)]();},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x6c9)]={},Scene_Boot[_0x4a5d62(0x5da)][_0x4a5d62(0x33a)]=function(){const _0x2e4a35=_0x4a5d62,_0x2bc858=[_0x2e4a35(0x200),_0x2e4a35(0x48d),_0x2e4a35(0x562),_0x2e4a35(0x952),_0x2e4a35(0x1e0),'MDF','AGI',_0x2e4a35(0x790)],_0x24bdbe=['HIT',_0x2e4a35(0x6b1),_0x2e4a35(0x84d),_0x2e4a35(0x6ee),'MEV','MRF',_0x2e4a35(0x904),_0x2e4a35(0x4b5),_0x2e4a35(0x558),'TRG'],_0x315c86=[_0x2e4a35(0x71d),_0x2e4a35(0x2dd),_0x2e4a35(0x397),_0x2e4a35(0x4d5),'MCR','TCR',_0x2e4a35(0x5b6),_0x2e4a35(0x7cb),_0x2e4a35(0x909),_0x2e4a35(0x222)],_0x326701=[_0x2bc858,_0x24bdbe,_0x315c86],_0x37b1b9=['Plus',_0x2e4a35(0x53a),_0x2e4a35(0x4c1),_0x2e4a35(0x8ef),'Rate',_0x2e4a35(0x70b),_0x2e4a35(0x66c),'Flat','Flat1',_0x2e4a35(0x2c8)];for(const _0x1c260c of _0x326701){let _0x262774='';if(_0x1c260c===_0x2bc858)_0x262774='param';if(_0x1c260c===_0x24bdbe)_0x262774=_0x2e4a35(0x697);if(_0x1c260c===_0x315c86)_0x262774='sparam';for(const _0x553394 of _0x37b1b9){let _0x11c860=_0x2e4a35(0x4c4)['format'](_0x262774,_0x553394);VisuMZ[_0x2e4a35(0x2df)][_0x2e4a35(0x6c9)][_0x11c860]=[],VisuMZ[_0x2e4a35(0x2df)]['RegExp'][_0x11c860+'JS']=[];let _0xb49d84=_0x2e4a35(0x452);if([_0x2e4a35(0x423),'Flat'][_0x2e4a35(0x1cd)](_0x553394))_0xb49d84+=_0x2e4a35(0x551);else{if([_0x2e4a35(0x53a),_0x2e4a35(0x44a)]['includes'](_0x553394))_0xb49d84+=_0x2e4a35(0x755);else{if([_0x2e4a35(0x4c1),_0x2e4a35(0x2c8)][_0x2e4a35(0x1cd)](_0x553394))_0xb49d84+=_0x2e4a35(0x7ce);else{if(_0x553394===_0x2e4a35(0x8ef))_0xb49d84+=_0x2e4a35(0x2f9);else{if(_0x553394===_0x2e4a35(0x70b))_0xb49d84+='(\x5cd+)([%％])>';else _0x553394===_0x2e4a35(0x66c)&&(_0xb49d84+=_0x2e4a35(0x712));}}}}for(const _0x6c4969 of _0x1c260c){let _0x3c7433=_0x553394[_0x2e4a35(0x805)](/[\d+]/g,'')['toUpperCase']();const _0xaf3c10=_0xb49d84[_0x2e4a35(0x807)](_0x6c4969,_0x3c7433);VisuMZ['CoreEngine'][_0x2e4a35(0x6c9)][_0x11c860][_0x2e4a35(0x98c)](new RegExp(_0xaf3c10,'i'));const _0x3cb9ec=_0x2e4a35(0x326)[_0x2e4a35(0x807)](_0x6c4969,_0x3c7433);VisuMZ['CoreEngine'][_0x2e4a35(0x6c9)][_0x11c860+'JS'][_0x2e4a35(0x98c)](new RegExp(_0x3cb9ec,'i'));}}}},Scene_Boot[_0x4a5d62(0x5da)][_0x4a5d62(0x307)]=function(){const _0x57ae66=_0x4a5d62;if(VisuMZ[_0x57ae66(0x48a)])return;},Scene_Boot[_0x4a5d62(0x5da)]['process_VisuMZ_CoreEngine_Settings']=function(){const _0x23c424=_0x4a5d62,_0x42cb9a=VisuMZ[_0x23c424(0x2df)][_0x23c424(0x7d0)];_0x42cb9a[_0x23c424(0x235)][_0x23c424(0x82d)]&&VisuMZ[_0x23c424(0x347)](!![]);_0x42cb9a[_0x23c424(0x235)][_0x23c424(0x58c)]&&(Input['keyMapper'][0x23]=_0x23c424(0x34a),Input[_0x23c424(0x7ef)][0x24]=_0x23c424(0x527));if(_0x42cb9a[_0x23c424(0x8a1)]){const _0x1a3a0c=_0x42cb9a[_0x23c424(0x8a1)];_0x1a3a0c[_0x23c424(0x6e6)]=_0x1a3a0c[_0x23c424(0x6e6)]||'\x5c}❪SHIFT❫\x5c{',_0x1a3a0c[_0x23c424(0x863)]=_0x1a3a0c[_0x23c424(0x863)]||_0x23c424(0x933);}_0x42cb9a[_0x23c424(0x994)]['WASD']&&(Input[_0x23c424(0x7ef)][0x57]='up',Input[_0x23c424(0x7ef)][0x41]='left',Input[_0x23c424(0x7ef)][0x53]=_0x23c424(0x7bc),Input[_0x23c424(0x7ef)][0x44]=_0x23c424(0x743),Input['keyMapper'][0x45]=_0x23c424(0x865)),_0x42cb9a[_0x23c424(0x994)][_0x23c424(0x6bc)]&&(Input[_0x23c424(0x7ef)][0x52]=_0x23c424(0x782)),_0x42cb9a[_0x23c424(0x6ea)]['DisplayedParams']=_0x42cb9a[_0x23c424(0x6ea)][_0x23c424(0x1f5)][_0x23c424(0x714)](_0x3fbe18=>_0x3fbe18[_0x23c424(0x8be)]()[_0x23c424(0x5d4)]()),_0x42cb9a[_0x23c424(0x6ea)][_0x23c424(0x50b)]=_0x42cb9a[_0x23c424(0x6ea)]['ExtDisplayedParams'][_0x23c424(0x714)](_0x30eddc=>_0x30eddc[_0x23c424(0x8be)]()[_0x23c424(0x5d4)]()),_0x42cb9a[_0x23c424(0x235)][_0x23c424(0x479)]=_0x42cb9a[_0x23c424(0x235)][_0x23c424(0x479)]??!![],_0x42cb9a[_0x23c424(0x235)][_0x23c424(0x64d)]=_0x42cb9a['QoL'][_0x23c424(0x64d)]??!![],_0x42cb9a['ButtonAssist'][_0x23c424(0x312)]&&VisuMZ['CoreEngine'][_0x23c424(0x60d)]();},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x60d)]=function(){const _0x4c5d8b=_0x4a5d62;let _0xc4936b=![],_0x93e122=![];for(let _0x5c8767 in Input[_0x4c5d8b(0x7ef)]){const _0xa60d25=Input['keyMapper'][_0x5c8767];if(_0xa60d25==='menu')_0xc4936b=!![];if(_0xa60d25===_0x4c5d8b(0x1da))_0x93e122=!![];if(_0xc4936b&&_0x93e122)return;}let _0x3bbf22=_0x4c5d8b(0x587);_0x3bbf22+=_0x4c5d8b(0x386),_0x3bbf22+=_0x4c5d8b(0x3f8),_0x3bbf22+=_0x4c5d8b(0x756),_0x3bbf22+=_0x4c5d8b(0x468),alert(_0x3bbf22),SceneManager[_0x4c5d8b(0x6d4)]();},Scene_Boot[_0x4a5d62(0x5da)][_0x4a5d62(0x79e)]=function(){const _0x10999b=_0x4a5d62;this[_0x10999b(0x625)]();},Scene_Boot[_0x4a5d62(0x5da)][_0x4a5d62(0x625)]=function(){const _0x1a6b8c=_0x4a5d62,_0x55e367=VisuMZ[_0x1a6b8c(0x2df)][_0x1a6b8c(0x7d0)][_0x1a6b8c(0x637)];for(const _0x2a7712 of _0x55e367){const _0x560bc0=_0x2a7712[_0x1a6b8c(0x99f)][_0x1a6b8c(0x805)](/[ ]/g,''),_0x21bf88=_0x2a7712[_0x1a6b8c(0x792)];VisuMZ['CoreEngine'][_0x1a6b8c(0x2e6)](_0x560bc0,_0x21bf88);}},VisuMZ['CoreEngine'][_0x4a5d62(0x2e6)]=function(_0x331722,_0x37b56b){const _0x4cb554=_0x4a5d62;if(!!window[_0x331722]){if($gameTemp[_0x4cb554(0x84c)]())console[_0x4cb554(0x5f5)]('WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function'[_0x4cb554(0x807)](_0x331722));}const _0x467e5d=_0x4cb554(0x46c)['format'](_0x331722,_0x37b56b);window[_0x331722]=new Function(_0x467e5d);},Scene_Boot[_0x4a5d62(0x5da)][_0x4a5d62(0x972)]=function(){const _0x5892da=_0x4a5d62,_0xfe262f=VisuMZ[_0x5892da(0x2df)][_0x5892da(0x7d0)][_0x5892da(0x658)];if(!_0xfe262f)return;for(const _0x591c14 of _0xfe262f){if(!_0x591c14)continue;VisuMZ[_0x5892da(0x2df)][_0x5892da(0x461)](_0x591c14);}},VisuMZ['CoreEngine'][_0x4a5d62(0x4d3)]={},VisuMZ[_0x4a5d62(0x2df)]['CustomParamIcons']={},VisuMZ['CoreEngine'][_0x4a5d62(0x878)]={},VisuMZ['CoreEngine'][_0x4a5d62(0x26e)]={},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x461)]=function(_0x3217f0){const _0x39c4c5=_0x4a5d62,_0x2210e8=_0x3217f0[_0x39c4c5(0x912)],_0x5d7070=_0x3217f0[_0x39c4c5(0x23b)],_0x346876=_0x3217f0[_0x39c4c5(0x85a)],_0x7ebcd6=_0x3217f0[_0x39c4c5(0x4f9)],_0x4454fb=new Function(_0x3217f0['ValueJS']);VisuMZ['CoreEngine'][_0x39c4c5(0x4d3)][_0x2210e8['toUpperCase']()['trim']()]=_0x5d7070,VisuMZ[_0x39c4c5(0x2df)]['CustomParamIcons'][_0x2210e8[_0x39c4c5(0x8be)]()['trim']()]=_0x346876,VisuMZ[_0x39c4c5(0x2df)]['CustomParamType'][_0x2210e8['toUpperCase']()[_0x39c4c5(0x5d4)]()]=_0x7ebcd6,VisuMZ[_0x39c4c5(0x2df)][_0x39c4c5(0x26e)][_0x2210e8[_0x39c4c5(0x8be)]()[_0x39c4c5(0x5d4)]()]=_0x2210e8,Object[_0x39c4c5(0x67c)](Game_BattlerBase[_0x39c4c5(0x5da)],_0x2210e8,{'get'(){const _0x27df25=_0x39c4c5,_0x38b012=_0x4454fb[_0x27df25(0x35f)](this);return _0x7ebcd6===_0x27df25(0x60b)?Math['round'](_0x38b012):_0x38b012;}});},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x483)]={},VisuMZ[_0x4a5d62(0x2df)]['ControllerMatches']={},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_ControllerButtons']=function(){const _0x3ca21a=_0x4a5d62,_0x1ec93d=VisuMZ[_0x3ca21a(0x2df)][_0x3ca21a(0x7d0)][_0x3ca21a(0x483)];for(const _0x4dfecb of _0x1ec93d){const _0x1f1ae4=(_0x4dfecb[_0x3ca21a(0x377)]||'')[_0x3ca21a(0x545)]()[_0x3ca21a(0x5d4)](),_0x584861=(_0x4dfecb['Match']||'')[_0x3ca21a(0x545)]()[_0x3ca21a(0x5d4)]();VisuMZ[_0x3ca21a(0x2df)][_0x3ca21a(0x483)][_0x1f1ae4]=_0x4dfecb,VisuMZ[_0x3ca21a(0x2df)][_0x3ca21a(0x1c7)][_0x584861]=_0x1f1ae4;}},VisuMZ[_0x4a5d62(0x48a)]=function(){const _0x89e884=_0x4a5d62;for(const _0x5ca001 of $dataActors){if(_0x5ca001)VisuMZ[_0x89e884(0x99b)](_0x5ca001);}for(const _0x423e30 of $dataClasses){if(_0x423e30)VisuMZ[_0x89e884(0x681)](_0x423e30);}for(const _0x1ccd33 of $dataSkills){if(_0x1ccd33)VisuMZ['ParseSkillNotetags'](_0x1ccd33);}for(const _0x3abcd3 of $dataItems){if(_0x3abcd3)VisuMZ[_0x89e884(0x341)](_0x3abcd3);}for(const _0x1e6b95 of $dataWeapons){if(_0x1e6b95)VisuMZ[_0x89e884(0x6ff)](_0x1e6b95);}for(const _0x582f52 of $dataArmors){if(_0x582f52)VisuMZ[_0x89e884(0x8b6)](_0x582f52);}for(const _0x30499c of $dataEnemies){if(_0x30499c)VisuMZ[_0x89e884(0x1e7)](_0x30499c);}for(const _0x3e1513 of $dataStates){if(_0x3e1513)VisuMZ['ParseStateNotetags'](_0x3e1513);}for(const _0x414b7b of $dataTilesets){if(_0x414b7b)VisuMZ[_0x89e884(0x88a)](_0x414b7b);}},VisuMZ[_0x4a5d62(0x99b)]=function(_0x27979e){},VisuMZ[_0x4a5d62(0x681)]=function(_0x3dad5d){},VisuMZ[_0x4a5d62(0x33f)]=function(_0x176cae){},VisuMZ[_0x4a5d62(0x341)]=function(_0x11c13c){},VisuMZ[_0x4a5d62(0x6ff)]=function(_0x550a31){},VisuMZ[_0x4a5d62(0x8b6)]=function(_0x388351){},VisuMZ[_0x4a5d62(0x1e7)]=function(_0x53ec48){},VisuMZ[_0x4a5d62(0x6d0)]=function(_0x2854de){},VisuMZ[_0x4a5d62(0x88a)]=function(_0x4122cc){},VisuMZ[_0x4a5d62(0x2df)]['ParseActorNotetags']=VisuMZ[_0x4a5d62(0x99b)],VisuMZ['ParseActorNotetags']=function(_0x2ac736){const _0x3dd78c=_0x4a5d62;VisuMZ[_0x3dd78c(0x2df)][_0x3dd78c(0x99b)][_0x3dd78c(0x35f)](this,_0x2ac736);const _0x268ed6=_0x2ac736[_0x3dd78c(0x6c6)];if(_0x268ed6[_0x3dd78c(0x245)](/<MAX LEVEL:[ ](\d+)>/i)){_0x2ac736['maxLevel']=Number(RegExp['$1']);if(_0x2ac736[_0x3dd78c(0x480)]===0x0)_0x2ac736['maxLevel']=Number[_0x3dd78c(0x974)];}_0x268ed6[_0x3dd78c(0x245)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x2ac736['initialLevel']=Math['min'](Number(RegExp['$1']),_0x2ac736[_0x3dd78c(0x480)]));},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x681)]=VisuMZ[_0x4a5d62(0x681)],VisuMZ[_0x4a5d62(0x681)]=function(_0xdc51a1){const _0x4e0cfa=_0x4a5d62;VisuMZ[_0x4e0cfa(0x2df)]['ParseClassNotetags'][_0x4e0cfa(0x35f)](this,_0xdc51a1);if(_0xdc51a1[_0x4e0cfa(0x901)])for(const _0x5212b5 of _0xdc51a1[_0x4e0cfa(0x901)]){_0x5212b5[_0x4e0cfa(0x6c6)][_0x4e0cfa(0x245)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x5212b5[_0x4e0cfa(0x416)]=Math[_0x4e0cfa(0x4ef)](Number(RegExp['$1']),0x1));}},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x1e7)]=VisuMZ[_0x4a5d62(0x1e7)],VisuMZ[_0x4a5d62(0x1e7)]=function(_0x56df54){const _0x34488c=_0x4a5d62;VisuMZ[_0x34488c(0x2df)]['ParseEnemyNotetags'][_0x34488c(0x35f)](this,_0x56df54),_0x56df54[_0x34488c(0x416)]=0x1;const _0x5824e2=_0x56df54[_0x34488c(0x6c6)];if(_0x5824e2[_0x34488c(0x245)](/<LEVEL:[ ](\d+)>/i))_0x56df54[_0x34488c(0x416)]=Number(RegExp['$1']);if(_0x5824e2['match'](/<MAXHP:[ ](\d+)>/i))_0x56df54[_0x34488c(0x9a1)][0x0]=Number(RegExp['$1']);if(_0x5824e2['match'](/<MAXMP:[ ](\d+)>/i))_0x56df54[_0x34488c(0x9a1)][0x1]=Number(RegExp['$1']);if(_0x5824e2[_0x34488c(0x245)](/<ATK:[ ](\d+)>/i))_0x56df54['params'][0x2]=Number(RegExp['$1']);if(_0x5824e2[_0x34488c(0x245)](/<DEF:[ ](\d+)>/i))_0x56df54[_0x34488c(0x9a1)][0x3]=Number(RegExp['$1']);if(_0x5824e2[_0x34488c(0x245)](/<MAT:[ ](\d+)>/i))_0x56df54['params'][0x4]=Number(RegExp['$1']);if(_0x5824e2[_0x34488c(0x245)](/<MDF:[ ](\d+)>/i))_0x56df54[_0x34488c(0x9a1)][0x5]=Number(RegExp['$1']);if(_0x5824e2[_0x34488c(0x245)](/<AGI:[ ](\d+)>/i))_0x56df54['params'][0x6]=Number(RegExp['$1']);if(_0x5824e2[_0x34488c(0x245)](/<LUK:[ ](\d+)>/i))_0x56df54[_0x34488c(0x9a1)][0x7]=Number(RegExp['$1']);if(_0x5824e2['match'](/<EXP:[ ](\d+)>/i))_0x56df54[_0x34488c(0x554)]=Number(RegExp['$1']);if(_0x5824e2[_0x34488c(0x245)](/<GOLD:[ ](\d+)>/i))_0x56df54[_0x34488c(0x623)]=Number(RegExp['$1']);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x46d)]=Graphics['_defaultStretchMode'],Graphics[_0x4a5d62(0x77c)]=function(){const _0x211c45=_0x4a5d62;switch(VisuMZ['CoreEngine'][_0x211c45(0x7d0)][_0x211c45(0x235)][_0x211c45(0x25a)]){case _0x211c45(0x5ef):return!![];case'normal':return![];default:return VisuMZ[_0x211c45(0x2df)][_0x211c45(0x46d)][_0x211c45(0x35f)](this);}},VisuMZ['CoreEngine'][_0x4a5d62(0x7d5)]=Graphics[_0x4a5d62(0x43d)],Graphics['printError']=function(_0x270855,_0x4e5f91,_0x26018e=null){const _0x1c64e3=_0x4a5d62;VisuMZ['CoreEngine'][_0x1c64e3(0x7d5)][_0x1c64e3(0x35f)](this,_0x270855,_0x4e5f91,_0x26018e),VisuMZ[_0x1c64e3(0x347)](![]);},VisuMZ[_0x4a5d62(0x2df)]['Graphics_centerElement']=Graphics[_0x4a5d62(0x6f2)],Graphics['_centerElement']=function(_0x3605e8){const _0x5837a6=_0x4a5d62;VisuMZ[_0x5837a6(0x2df)][_0x5837a6(0x23c)][_0x5837a6(0x35f)](this,_0x3605e8),this['_centerElementCoreEngine'](_0x3605e8);},Graphics[_0x4a5d62(0x3cd)]=function(_0x1cd0c3){const _0x2f6fb7=_0x4a5d62;VisuMZ['CoreEngine'][_0x2f6fb7(0x7d0)][_0x2f6fb7(0x235)][_0x2f6fb7(0x4c9)]&&(_0x1cd0c3[_0x2f6fb7(0x621)][_0x2f6fb7(0x5ac)]=_0x2f6fb7(0x723));VisuMZ['CoreEngine']['Settings'][_0x2f6fb7(0x235)][_0x2f6fb7(0x626)]&&(_0x1cd0c3[_0x2f6fb7(0x621)][_0x2f6fb7(0x37d)]=_0x2f6fb7(0x787));const _0x4c4793=Math[_0x2f6fb7(0x4ef)](0x0,Math[_0x2f6fb7(0x734)](_0x1cd0c3[_0x2f6fb7(0x6e0)]*this[_0x2f6fb7(0x80a)])),_0x161e4a=Math[_0x2f6fb7(0x4ef)](0x0,Math['floor'](_0x1cd0c3[_0x2f6fb7(0x592)]*this[_0x2f6fb7(0x80a)]));_0x1cd0c3[_0x2f6fb7(0x621)][_0x2f6fb7(0x6e0)]=_0x4c4793+'px',_0x1cd0c3[_0x2f6fb7(0x621)][_0x2f6fb7(0x592)]=_0x161e4a+'px';},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x399)]=Bitmap[_0x4a5d62(0x5da)][_0x4a5d62(0x96b)],Bitmap[_0x4a5d62(0x5da)][_0x4a5d62(0x96b)]=function(_0x3a7903,_0x310014){const _0x2fe6e6=_0x4a5d62;VisuMZ[_0x2fe6e6(0x2df)][_0x2fe6e6(0x399)][_0x2fe6e6(0x35f)](this,_0x3a7903,_0x310014),this['_smooth']=!(VisuMZ[_0x2fe6e6(0x2df)][_0x2fe6e6(0x7d0)][_0x2fe6e6(0x235)][_0x2fe6e6(0x626)]??!![]);},Bitmap[_0x4a5d62(0x5da)][_0x4a5d62(0x365)]=function(){const _0x1f453a=_0x4a5d62;this[_0x1f453a(0x7e5)]=!![];},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x3f3)]=Sprite[_0x4a5d62(0x5da)][_0x4a5d62(0x880)],Sprite[_0x4a5d62(0x5da)][_0x4a5d62(0x880)]=function(){const _0x2d653f=_0x4a5d62;if(this['_texture'])VisuMZ['CoreEngine'][_0x2d653f(0x3f3)]['call'](this);this[_0x2d653f(0x876)]();},Sprite['prototype'][_0x4a5d62(0x876)]=function(){const _0x375e94=_0x4a5d62;if(!this['bitmap'])return;if(!this[_0x375e94(0x757)][_0x375e94(0x7e5)])return;this[_0x375e94(0x757)]['_baseTexture']&&!this['_bitmap'][_0x375e94(0x224)]['destroyed']&&this[_0x375e94(0x757)][_0x375e94(0x880)]();},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x255)]=Bitmap[_0x4a5d62(0x5da)]['resize'],Bitmap[_0x4a5d62(0x5da)][_0x4a5d62(0x398)]=function(_0x394563,_0x3af61f){const _0x14bd11=_0x4a5d62;VisuMZ[_0x14bd11(0x2df)][_0x14bd11(0x255)][_0x14bd11(0x35f)](this,_0x394563,_0x3af61f),this[_0x14bd11(0x365)]();},VisuMZ['CoreEngine']['Bitmap_blt']=Bitmap[_0x4a5d62(0x5da)]['blt'],Bitmap[_0x4a5d62(0x5da)][_0x4a5d62(0x820)]=function(_0x164e5d,_0x5d008c,_0xe8ef92,_0x3c06dc,_0x33a93e,_0x3ea48f,_0x595081,_0x4ddf24,_0x21009a){const _0xbeb142=_0x4a5d62;_0x5d008c=Math[_0xbeb142(0x372)](_0x5d008c),_0xe8ef92=Math['round'](_0xe8ef92),_0x3c06dc=Math[_0xbeb142(0x372)](_0x3c06dc),_0x33a93e=Math[_0xbeb142(0x372)](_0x33a93e),_0x3ea48f=Math['round'](_0x3ea48f),_0x595081=Math[_0xbeb142(0x372)](_0x595081),VisuMZ[_0xbeb142(0x2df)][_0xbeb142(0x4e0)][_0xbeb142(0x35f)](this,_0x164e5d,_0x5d008c,_0xe8ef92,_0x3c06dc,_0x33a93e,_0x3ea48f,_0x595081,_0x4ddf24,_0x21009a),this[_0xbeb142(0x365)]();},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x800)]=Bitmap[_0x4a5d62(0x5da)][_0x4a5d62(0x324)],Bitmap[_0x4a5d62(0x5da)][_0x4a5d62(0x324)]=function(_0x1a23fe,_0x494989,_0xde3d49,_0x3245f6){const _0x2a23b1=_0x4a5d62;VisuMZ[_0x2a23b1(0x2df)]['Bitmap_clearRect'][_0x2a23b1(0x35f)](this,_0x1a23fe,_0x494989,_0xde3d49,_0x3245f6),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x4a5d62(0x920)]=Bitmap[_0x4a5d62(0x5da)][_0x4a5d62(0x47d)],Bitmap[_0x4a5d62(0x5da)][_0x4a5d62(0x47d)]=function(_0x1ad36f,_0x242656,_0x28b31f,_0x43c992,_0x248bcf){const _0x5d2414=_0x4a5d62;VisuMZ[_0x5d2414(0x2df)][_0x5d2414(0x920)][_0x5d2414(0x35f)](this,_0x1ad36f,_0x242656,_0x28b31f,_0x43c992,_0x248bcf),this[_0x5d2414(0x365)]();},VisuMZ[_0x4a5d62(0x2df)]['Bitmap_strokeRect']=Bitmap[_0x4a5d62(0x5da)]['strokeRect'],Bitmap[_0x4a5d62(0x5da)][_0x4a5d62(0x864)]=function(_0x509a69,_0x325f28,_0x305c39,_0x2cd313,_0x4d319d){const _0x49098e=_0x4a5d62;VisuMZ['CoreEngine'][_0x49098e(0x609)]['call'](this,_0x509a69,_0x325f28,_0x305c39,_0x2cd313,_0x4d319d),this[_0x49098e(0x365)]();},VisuMZ[_0x4a5d62(0x2df)]['Bitmap_gradientFillRect']=Bitmap[_0x4a5d62(0x5da)]['gradientFillRect'],Bitmap[_0x4a5d62(0x5da)][_0x4a5d62(0x70f)]=function(_0x420a24,_0x5cee34,_0xee01eb,_0x25672e,_0x1b7b94,_0x10bd38,_0x236c1e){const _0x4d9ee0=_0x4a5d62;VisuMZ[_0x4d9ee0(0x2df)][_0x4d9ee0(0x564)][_0x4d9ee0(0x35f)](this,_0x420a24,_0x5cee34,_0xee01eb,_0x25672e,_0x1b7b94,_0x10bd38,_0x236c1e),this[_0x4d9ee0(0x365)]();},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x499)]=Bitmap[_0x4a5d62(0x5da)][_0x4a5d62(0x376)],Bitmap[_0x4a5d62(0x5da)][_0x4a5d62(0x376)]=function(_0x30f5ff,_0x338a90,_0x40e906,_0x3bcafc){const _0x5775cd=_0x4a5d62;_0x30f5ff=Math[_0x5775cd(0x372)](_0x30f5ff),_0x338a90=Math[_0x5775cd(0x372)](_0x338a90),_0x40e906=Math[_0x5775cd(0x372)](_0x40e906),VisuMZ['CoreEngine'][_0x5775cd(0x499)][_0x5775cd(0x35f)](this,_0x30f5ff,_0x338a90,_0x40e906,_0x3bcafc),this[_0x5775cd(0x365)]();},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x794)]=Bitmap[_0x4a5d62(0x5da)][_0x4a5d62(0x88c)],Bitmap[_0x4a5d62(0x5da)][_0x4a5d62(0x88c)]=function(_0x5ae97b){const _0x14e942=_0x4a5d62;return Math[_0x14e942(0x783)](VisuMZ[_0x14e942(0x2df)][_0x14e942(0x794)][_0x14e942(0x35f)](this,_0x5ae97b));},VisuMZ['CoreEngine'][_0x4a5d62(0x6e4)]=Bitmap[_0x4a5d62(0x5da)][_0x4a5d62(0x59f)],Bitmap[_0x4a5d62(0x5da)][_0x4a5d62(0x59f)]=function(_0x5405b6,_0x140113,_0x4956ed,_0x33a2cb,_0x3101b0,_0x33c0c6){const _0x225650=_0x4a5d62;_0x140113=Math['round'](_0x140113),_0x4956ed=Math[_0x225650(0x372)](_0x4956ed),_0x33a2cb=Math[_0x225650(0x783)](_0x33a2cb),_0x3101b0=Math[_0x225650(0x783)](_0x3101b0),VisuMZ['CoreEngine']['Bitmap_drawText'][_0x225650(0x35f)](this,_0x5405b6,_0x140113,_0x4956ed,_0x33a2cb,_0x3101b0,_0x33c0c6),this[_0x225650(0x365)]();},VisuMZ['CoreEngine'][_0x4a5d62(0x2de)]=Bitmap[_0x4a5d62(0x5da)]['_drawTextOutline'],Bitmap[_0x4a5d62(0x5da)][_0x4a5d62(0x987)]=function(_0x42c9cd,_0xd7194d,_0x3dfd18,_0x206d27){const _0x3f6992=_0x4a5d62;VisuMZ[_0x3f6992(0x2df)][_0x3f6992(0x7d0)]['QoL'][_0x3f6992(0x1b7)]?this[_0x3f6992(0x636)](_0x42c9cd,_0xd7194d,_0x3dfd18,_0x206d27):VisuMZ[_0x3f6992(0x2df)][_0x3f6992(0x2de)][_0x3f6992(0x35f)](this,_0x42c9cd,_0xd7194d,_0x3dfd18,_0x206d27);},Bitmap[_0x4a5d62(0x5da)]['_drawTextShadow']=function(_0x2aa800,_0x4ae09d,_0x53a07d,_0x108000){const _0x3db692=_0x4a5d62,_0x5ed7c9=this['context'];_0x5ed7c9[_0x3db692(0x370)]=this[_0x3db692(0x968)],_0x5ed7c9[_0x3db692(0x232)](_0x2aa800,_0x4ae09d+0x2,_0x53a07d+0x2,_0x108000);},VisuMZ[_0x4a5d62(0x2df)]['Input_clear']=Input[_0x4a5d62(0x650)],Input[_0x4a5d62(0x650)]=function(){const _0x1ed197=_0x4a5d62;VisuMZ['CoreEngine'][_0x1ed197(0x35d)][_0x1ed197(0x35f)](this),this[_0x1ed197(0x892)]=undefined,this[_0x1ed197(0x713)]=undefined,this['_gamepadWait']=Input['keyRepeatWait'];},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x283)]=Input['update'],Input['update']=function(){const _0x417b18=_0x4a5d62;VisuMZ[_0x417b18(0x2df)]['Input_update'][_0x417b18(0x35f)](this);if(this[_0x417b18(0x476)])this[_0x417b18(0x476)]--;},VisuMZ['CoreEngine'][_0x4a5d62(0x73e)]=Input[_0x4a5d62(0x3c9)],Input[_0x4a5d62(0x3c9)]=function(){const _0x5aaeae=_0x4a5d62;if(this[_0x5aaeae(0x476)])return;VisuMZ[_0x5aaeae(0x2df)][_0x5aaeae(0x73e)][_0x5aaeae(0x35f)](this);},VisuMZ['CoreEngine'][_0x4a5d62(0x4da)]=Input[_0x4a5d62(0x526)],Input['_setupEventHandlers']=function(){const _0x1caf67=_0x4a5d62;VisuMZ['CoreEngine'][_0x1caf67(0x4da)][_0x1caf67(0x35f)](this),document[_0x1caf67(0x815)](_0x1caf67(0x2c1),this[_0x1caf67(0x58a)][_0x1caf67(0x37c)](this));},VisuMZ['CoreEngine'][_0x4a5d62(0x76b)]=Input[_0x4a5d62(0x679)],Input[_0x4a5d62(0x679)]=function(_0x73dd16){const _0x449377=_0x4a5d62;this['_inputSpecialKeyCode']=_0x73dd16[_0x449377(0x435)],VisuMZ[_0x449377(0x2df)]['Input_onKeyDown'][_0x449377(0x35f)](this,_0x73dd16),this[_0x449377(0x29c)](null);},Input[_0x4a5d62(0x58a)]=function(_0x209b5d){const _0xe6917f=_0x4a5d62;this[_0xe6917f(0x4d6)](_0x209b5d);},Input['_registerKeyInput']=function(_0xfdde0a){const _0x5946da=_0x4a5d62;this['_inputSpecialKeyCode']=_0xfdde0a[_0x5946da(0x435)];let _0xb16058=String[_0x5946da(0x4d4)](_0xfdde0a['charCode']);this[_0x5946da(0x892)]===undefined?this[_0x5946da(0x892)]=_0xb16058:this[_0x5946da(0x892)]+=_0xb16058;},VisuMZ[_0x4a5d62(0x2df)]['Input_shouldPreventDefault']=Input[_0x4a5d62(0x300)],Input[_0x4a5d62(0x300)]=function(_0xc2bba4){const _0x26a1a3=_0x4a5d62;if(_0xc2bba4===0x8)return![];return VisuMZ[_0x26a1a3(0x2df)][_0x26a1a3(0x995)]['call'](this,_0xc2bba4);},Input[_0x4a5d62(0x922)]=function(_0x22138c){const _0x1cacee=_0x4a5d62;if(_0x22138c[_0x1cacee(0x245)](/backspace/i))return this['_inputSpecialKeyCode']===0x8;if(_0x22138c[_0x1cacee(0x245)](/enter/i))return this['_inputSpecialKeyCode']===0xd;if(_0x22138c[_0x1cacee(0x245)](/escape/i))return this[_0x1cacee(0x713)]===0x1b;},Input[_0x4a5d62(0x4bd)]=function(){const _0x23c124=_0x4a5d62;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x23c124(0x713)]);},Input['isArrowPressed']=function(){const _0x555d5a=_0x4a5d62;return[0x25,0x26,0x27,0x28][_0x555d5a(0x740)](this[_0x555d5a(0x713)]);},Input['isGamepadConnected']=function(){const _0x374c60=_0x4a5d62;if(navigator['getGamepads']){const _0x2d387d=navigator[_0x374c60(0x6e5)]();if(_0x2d387d)for(const _0x372ded of _0x2d387d){if(_0x372ded&&_0x372ded[_0x374c60(0x3cc)])return!![];}}return![];},Input[_0x4a5d62(0x64e)]=function(){const _0x47ce0a=_0x4a5d62;if(navigator[_0x47ce0a(0x6e5)]){const _0x6d2aaa=navigator[_0x47ce0a(0x6e5)]();if(_0x6d2aaa)for(const _0x311250 of _0x6d2aaa){if(_0x311250&&_0x311250[_0x47ce0a(0x3cc)]){if(this[_0x47ce0a(0x30a)](_0x311250))return!![];if(this[_0x47ce0a(0x7e8)](_0x311250))return!![];}}}return![];},Input[_0x4a5d62(0x30a)]=function(_0x39706f){const _0x5acbfa=_0x4a5d62,_0x108e39=_0x39706f[_0x5acbfa(0x56c)];for(let _0x415ea8=0x0;_0x415ea8<_0x108e39['length'];_0x415ea8++){if(_0x108e39[_0x415ea8][_0x5acbfa(0x391)])return!![];}return![];},Input[_0x4a5d62(0x7e8)]=function(_0x17a88d){const _0x58b044=_0x4a5d62,_0x5d3897=_0x17a88d[_0x58b044(0x5f9)],_0x1c93f6=0.5;if(_0x5d3897[0x0]<-_0x1c93f6)return!![];if(_0x5d3897[0x0]>_0x1c93f6)return!![];if(_0x5d3897[0x1]<-_0x1c93f6)return!![];if(_0x5d3897[0x1]>_0x1c93f6)return!![];return![];},Input['getLastGamepadUsed']=function(){const _0x21e174=_0x4a5d62;return this[_0x21e174(0x791)]||null;},Input[_0x4a5d62(0x29c)]=function(_0x2959c1){this['_lastGamepad']=_0x2959c1;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x378)]=Input[_0x4a5d62(0x2b7)],Input[_0x4a5d62(0x2b7)]=function(_0x305301){const _0x336171=_0x4a5d62;VisuMZ['CoreEngine'][_0x336171(0x378)][_0x336171(0x35f)](this,_0x305301),(this[_0x336171(0x30a)](_0x305301)||this[_0x336171(0x7e8)](_0x305301))&&this[_0x336171(0x29c)](_0x305301);},Input['getLastUsedGamepadType']=function(){const _0x3d179e=_0x4a5d62;return this['_lastGamepad']?this[_0x3d179e(0x791)]['id']:_0x3d179e(0x3f5);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x832)]=Tilemap[_0x4a5d62(0x5da)][_0x4a5d62(0x21b)],Tilemap[_0x4a5d62(0x5da)]['_addShadow']=function(_0x37fe3c,_0x2bacbd,_0x11a5ed,_0x98b64b){const _0x500793=_0x4a5d62;if($gameMap&&$gameMap[_0x500793(0x906)]())return;VisuMZ[_0x500793(0x2df)][_0x500793(0x832)][_0x500793(0x35f)](this,_0x37fe3c,_0x2bacbd,_0x11a5ed,_0x98b64b);},Tilemap[_0x4a5d62(0x6bf)][_0x4a5d62(0x5da)][_0x4a5d62(0x517)]=function(){const _0x26d66e=_0x4a5d62;this['_destroyInternalTextures']();for(let _0x3f279b=0x0;_0x3f279b<Tilemap['Layer']['MAX_GL_TEXTURES'];_0x3f279b++){const _0x3b498e=new PIXI[(_0x26d66e(0x384))]();_0x3b498e['setSize'](0x800,0x800),VisuMZ['CoreEngine']['Settings'][_0x26d66e(0x235)]['PixelateImageRendering']&&(_0x3b498e['scaleMode']=PIXI[_0x26d66e(0x202)][_0x26d66e(0x2d5)]),this['_internalTextures'][_0x26d66e(0x98c)](_0x3b498e);}},WindowLayer[_0x4a5d62(0x5da)][_0x4a5d62(0x91d)]=function(){const _0x1408b6=_0x4a5d62;return SceneManager&&SceneManager['_scene']?SceneManager[_0x1408b6(0x7d2)][_0x1408b6(0x3bc)]():!![];},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x2d3)]=WindowLayer[_0x4a5d62(0x5da)][_0x4a5d62(0x8f5)],WindowLayer[_0x4a5d62(0x5da)]['render']=function render(_0x52d3d8){const _0x12ab6f=_0x4a5d62;this[_0x12ab6f(0x91d)]()?VisuMZ[_0x12ab6f(0x2df)][_0x12ab6f(0x2d3)][_0x12ab6f(0x35f)](this,_0x52d3d8):this['renderNoMask'](_0x52d3d8);},WindowLayer['prototype']['renderNoMask']=function render(_0x15b024){const _0x3cea55=_0x4a5d62;if(!this[_0x3cea55(0x27a)])return;const _0x3d9540=new PIXI[(_0x3cea55(0x4aa))](),_0x421817=_0x15b024['gl'],_0x2704cf=this[_0x3cea55(0x380)][_0x3cea55(0x349)]();_0x15b024[_0x3cea55(0x3c5)][_0x3cea55(0x736)](),_0x3d9540[_0x3cea55(0x38e)]=this[_0x3cea55(0x38e)],_0x15b024[_0x3cea55(0x7f8)]['flush'](),_0x421817[_0x3cea55(0x6f1)](_0x421817['STENCIL_TEST']);while(_0x2704cf[_0x3cea55(0x6d1)]>0x0){const _0x51e1dc=_0x2704cf[_0x3cea55(0x388)]();_0x51e1dc[_0x3cea55(0x279)]&&_0x51e1dc['visible']&&_0x51e1dc[_0x3cea55(0x699)]>0x0&&(_0x421817[_0x3cea55(0x89e)](_0x421817[_0x3cea55(0x82c)],0x0,~0x0),_0x421817[_0x3cea55(0x843)](_0x421817['KEEP'],_0x421817[_0x3cea55(0x553)],_0x421817['KEEP']),_0x51e1dc[_0x3cea55(0x8f5)](_0x15b024),_0x15b024[_0x3cea55(0x7f8)][_0x3cea55(0x3c6)](),_0x3d9540[_0x3cea55(0x650)](),_0x421817[_0x3cea55(0x89e)](_0x421817['ALWAYS'],0x1,~0x0),_0x421817['stencilOp'](_0x421817[_0x3cea55(0x24d)],_0x421817[_0x3cea55(0x24d)],_0x421817[_0x3cea55(0x24d)]),_0x421817[_0x3cea55(0x2b6)](_0x421817[_0x3cea55(0x866)],_0x421817[_0x3cea55(0x884)]),_0x3d9540[_0x3cea55(0x8f5)](_0x15b024),_0x15b024[_0x3cea55(0x7f8)][_0x3cea55(0x3c6)](),_0x421817[_0x3cea55(0x2b6)](_0x421817[_0x3cea55(0x884)],_0x421817[_0x3cea55(0x93d)]));}_0x421817[_0x3cea55(0x77d)](_0x421817[_0x3cea55(0x7dd)]),_0x421817['clear'](_0x421817[_0x3cea55(0x561)]),_0x421817[_0x3cea55(0x92d)](0x0),_0x15b024['batch'][_0x3cea55(0x3c6)]();for(const _0x45beeb of this['children']){!_0x45beeb[_0x3cea55(0x279)]&&_0x45beeb[_0x3cea55(0x27a)]&&_0x45beeb[_0x3cea55(0x8f5)](_0x15b024);}_0x15b024['batch'][_0x3cea55(0x3c6)]();},DataManager['isKeyItem']=function(_0x581c96){const _0x411b22=_0x4a5d62;return this[_0x411b22(0x3dd)](_0x581c96)&&_0x581c96['itypeId']===0x2;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x31b)]=DataManager[_0x4a5d62(0x57f)],DataManager[_0x4a5d62(0x57f)]=function(){const _0x5b15e0=_0x4a5d62;VisuMZ[_0x5b15e0(0x2df)][_0x5b15e0(0x31b)][_0x5b15e0(0x35f)](this),this[_0x5b15e0(0x41b)](),this[_0x5b15e0(0x90d)]();},DataManager['reservePlayTestNewGameCommonEvent']=function(){const _0x17f7bb=_0x4a5d62;if($gameTemp[_0x17f7bb(0x84c)]()){const _0x1a9548=VisuMZ[_0x17f7bb(0x2df)][_0x17f7bb(0x7d0)][_0x17f7bb(0x235)][_0x17f7bb(0x41a)];if(_0x1a9548>0x0)$gameTemp[_0x17f7bb(0x7c5)](_0x1a9548);}},DataManager['reserveNewGameCommonEvent']=function(){const _0xf0d141=_0x4a5d62,_0x2a3164=VisuMZ['CoreEngine'][_0xf0d141(0x7d0)][_0xf0d141(0x235)][_0xf0d141(0x4b2)]||0x0;if(_0x2a3164>0x0)$gameTemp[_0xf0d141(0x7c5)](_0x2a3164);},DataManager[_0x4a5d62(0x239)]=function(_0x38998e){const _0x1ffe24=_0x4a5d62,_0x2f6496=$dataTroops[_0x38998e];if(!_0x2f6496)return'';let _0x783d6='';_0x783d6+=_0x2f6496[_0x1ffe24(0x79f)];for(const _0x202d92 of _0x2f6496[_0x1ffe24(0x565)]){for(const _0x28a35d of _0x202d92[_0x1ffe24(0x56a)]){[0x6c,0x198]['includes'](_0x28a35d[_0x1ffe24(0x74f)])&&(_0x783d6+='\x0a',_0x783d6+=_0x28a35d[_0x1ffe24(0x7a1)][0x0]);}}return _0x783d6;};(VisuMZ[_0x4a5d62(0x2df)]['Settings'][_0x4a5d62(0x235)][_0x4a5d62(0x3d9)]??!![])&&($scene=null,VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x90b)]=Scene_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x963)],Scene_Base['prototype'][_0x4a5d62(0x963)]=function(){const _0x2ce985=_0x4a5d62;VisuMZ[_0x2ce985(0x2df)][_0x2ce985(0x90b)]['call'](this),$scene=this;},$spriteset=null,VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x66e)]=Scene_Map['prototype']['createSpriteset'],Scene_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x63d)]=function(){const _0x6a5233=_0x4a5d62;VisuMZ[_0x6a5233(0x2df)][_0x6a5233(0x66e)]['call'](this),$spriteset=this['_spriteset'];},VisuMZ[_0x4a5d62(0x2df)]['Scene_Battle_createSpriteset']=Scene_Battle['prototype']['createSpriteset'],Scene_Battle[_0x4a5d62(0x5da)][_0x4a5d62(0x63d)]=function(){const _0x23401a=_0x4a5d62;VisuMZ[_0x23401a(0x2df)][_0x23401a(0x49d)][_0x23401a(0x35f)](this),$spriteset=this[_0x23401a(0x5f4)];},VisuMZ['CoreEngine'][_0x4a5d62(0x2a1)]=Scene_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x830)],Scene_Base[_0x4a5d62(0x5da)]['terminate']=function(){const _0xd6679e=_0x4a5d62;VisuMZ[_0xd6679e(0x2df)][_0xd6679e(0x2a1)][_0xd6679e(0x35f)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x724)]=BattleManager[_0x4a5d62(0x8fa)],BattleManager[_0x4a5d62(0x8fa)]=function(_0x3f8dde){const _0x12effa=_0x4a5d62;VisuMZ[_0x12effa(0x2df)]['BattleManager_update']['call'](this,_0x3f8dde),this[_0x12effa(0x64f)]();},BattleManager['updateBattleVariables']=function(){const _0x223a39=_0x4a5d62;$subject=this['_subject'],$targets=this[_0x223a39(0x40e)],$target=this[_0x223a39(0x1ed)]||this[_0x223a39(0x40e)][0x0];},$event=null,VisuMZ['CoreEngine']['Game_Event_start']=Game_Event['prototype']['start'],Game_Event[_0x4a5d62(0x5da)][_0x4a5d62(0x360)]=function(){const _0x21cb9f=_0x4a5d62;VisuMZ[_0x21cb9f(0x2df)][_0x21cb9f(0x589)][_0x21cb9f(0x35f)](this),$event=this;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x1a3)]=Scene_Map[_0x4a5d62(0x5da)]['update'],Scene_Map[_0x4a5d62(0x5da)]['update']=function(){const _0x244d93=_0x4a5d62;VisuMZ[_0x244d93(0x2df)][_0x244d93(0x1a3)][_0x244d93(0x35f)](this),$gameMap['updateCurrentEvent']();},Game_Map['prototype'][_0x4a5d62(0x3e1)]=function(){const _0x31da63=_0x4a5d62;!this[_0x31da63(0x976)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x1a2d4e){if($gameTemp)$gameTemp['reserveCommonEvent'](_0x1a2d4e);});;$onceParallel=function(_0x565bcc,_0xb0aea3){const _0x125a24=_0x4a5d62;if(SceneManager[_0x125a24(0x89c)]())SceneManager[_0x125a24(0x7d2)][_0x125a24(0x604)](_0x565bcc,_0xb0aea3);else{if(SceneManager[_0x125a24(0x3a2)]()){if(Imported[_0x125a24(0x642)])SceneManager[_0x125a24(0x7d2)][_0x125a24(0x604)](_0x565bcc);else $gameTemp&&$gameTemp[_0x125a24(0x84c)]()&&alert(_0x125a24(0x784));}else $gameTemp&&$gameTemp[_0x125a24(0x84c)]()&&alert(_0x125a24(0x269));}},StorageManager['jsonToZip']=function(_0x285e29){return new Promise((_0xe83d8e,_0x75fba5)=>{const _0x54edce=_0x1f9c;try{const _0x5309e2=pako['deflate'](_0x285e29,{'to':_0x54edce(0x9a6),'level':0x1});if(_0x5309e2['length']>=0xc350){}_0xe83d8e(_0x5309e2);}catch(_0x24f7fa){_0x75fba5(_0x24f7fa);}});},TextManager[_0x4a5d62(0x6ab)]=['','','','CANCEL','','',_0x4a5d62(0x567),'',_0x4a5d62(0x4fd),_0x4a5d62(0x34f),'','',_0x4a5d62(0x22b),'ENTER','ENTER_SPECIAL','',_0x4a5d62(0x518),_0x4a5d62(0x614),_0x4a5d62(0x8d3),_0x4a5d62(0x6a3),_0x4a5d62(0x84e),'KANA',_0x4a5d62(0x5c0),_0x4a5d62(0x973),_0x4a5d62(0x752),'HANJA','',_0x4a5d62(0x6a2),_0x4a5d62(0x6bd),'NONCONVERT','ACCEPT','MODECHANGE',_0x4a5d62(0x2e1),_0x4a5d62(0x1a1),_0x4a5d62(0x82b),_0x4a5d62(0x408),_0x4a5d62(0x806),_0x4a5d62(0x98e),'UP','RIGHT',_0x4a5d62(0x8a2),_0x4a5d62(0x680),_0x4a5d62(0x961),_0x4a5d62(0x91e),_0x4a5d62(0x775),_0x4a5d62(0x4a3),_0x4a5d62(0x552),'','0','1','2','3','4','5','6','7','8','9',_0x4a5d62(0x1a8),'SEMICOLON',_0x4a5d62(0x875),_0x4a5d62(0x281),_0x4a5d62(0x3a8),_0x4a5d62(0x5b8),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x4a5d62(0x230),'','CONTEXT_MENU','',_0x4a5d62(0x56e),'NUMPAD0',_0x4a5d62(0x78b),_0x4a5d62(0x707),'NUMPAD3',_0x4a5d62(0x810),_0x4a5d62(0x94f),_0x4a5d62(0x32b),'NUMPAD7','NUMPAD8','NUMPAD9',_0x4a5d62(0x481),'ADD',_0x4a5d62(0x85d),_0x4a5d62(0x57b),_0x4a5d62(0x96a),_0x4a5d62(0x261),'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12',_0x4a5d62(0x2f5),'F14','F15',_0x4a5d62(0x627),_0x4a5d62(0x52b),_0x4a5d62(0x739),_0x4a5d62(0x79c),_0x4a5d62(0x5a9),'F21','F22',_0x4a5d62(0x8ac),_0x4a5d62(0x361),'','','','','','','','',_0x4a5d62(0x837),'SCROLL_LOCK',_0x4a5d62(0x254),_0x4a5d62(0x7b0),_0x4a5d62(0x458),_0x4a5d62(0x8fb),'WIN_OEM_FJ_ROYA','','','','','','','','','','CIRCUMFLEX',_0x4a5d62(0x4bb),_0x4a5d62(0x74a),'HASH',_0x4a5d62(0x4c6),_0x4a5d62(0x2c6),_0x4a5d62(0x753),_0x4a5d62(0x7b4),_0x4a5d62(0x7ad),_0x4a5d62(0x5d0),_0x4a5d62(0x638),_0x4a5d62(0x333),_0x4a5d62(0x21c),_0x4a5d62(0x584),'OPEN_CURLY_BRACKET','CLOSE_CURLY_BRACKET','TILDE','','','','',_0x4a5d62(0x771),_0x4a5d62(0x1d6),_0x4a5d62(0x91f),'','',_0x4a5d62(0x6db),_0x4a5d62(0x281),_0x4a5d62(0x97b),_0x4a5d62(0x500),_0x4a5d62(0x632),_0x4a5d62(0x1e3),_0x4a5d62(0x8d6),'','','','','','','','','','','','','','','','','','','','','','','','','','','OPEN_BRACKET',_0x4a5d62(0x78d),_0x4a5d62(0x6d2),_0x4a5d62(0x3ab),'',_0x4a5d62(0x643),'ALTGR','',_0x4a5d62(0x8e4),_0x4a5d62(0x8e6),'',_0x4a5d62(0x8f8),'','',_0x4a5d62(0x8d0),_0x4a5d62(0x4c3),_0x4a5d62(0x83f),_0x4a5d62(0x54b),_0x4a5d62(0x79b),_0x4a5d62(0x913),_0x4a5d62(0x5aa),_0x4a5d62(0x414),_0x4a5d62(0x419),_0x4a5d62(0x29e),'WIN_OEM_AUTO',_0x4a5d62(0x7f3),_0x4a5d62(0x65e),_0x4a5d62(0x686),_0x4a5d62(0x1dc),_0x4a5d62(0x774),_0x4a5d62(0x30c),'PLAY',_0x4a5d62(0x7ac),'',_0x4a5d62(0x251),_0x4a5d62(0x628),''],TextManager[_0x4a5d62(0x40f)]=VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x7d0)]['ButtonAssist'][_0x4a5d62(0x814)],TextManager[_0x4a5d62(0x5a5)]=VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x7d0)][_0x4a5d62(0x8a1)][_0x4a5d62(0x857)],TextManager['buttonAssistSwitch']=VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x7d0)]['ButtonAssist']['SwitchActorText'],VisuMZ[_0x4a5d62(0x2df)]['TextManager_param']=TextManager[_0x4a5d62(0x656)],TextManager[_0x4a5d62(0x656)]=function(_0x4b0b9f){const _0x45a0ec=_0x4a5d62;return typeof _0x4b0b9f==='number'?VisuMZ[_0x45a0ec(0x2df)][_0x45a0ec(0x891)][_0x45a0ec(0x35f)](this,_0x4b0b9f):this['paramName'](_0x4b0b9f);},TextManager[_0x4a5d62(0x908)]=function(_0x19cdd5){const _0x1288ba=_0x4a5d62;_0x19cdd5=String(_0x19cdd5||'')['toUpperCase']();const _0x21c187=VisuMZ[_0x1288ba(0x2df)][_0x1288ba(0x7d0)]['Param'];if(_0x19cdd5===_0x1288ba(0x200))return $dataSystem[_0x1288ba(0x3e9)][_0x1288ba(0x9a1)][0x0];if(_0x19cdd5===_0x1288ba(0x48d))return $dataSystem[_0x1288ba(0x3e9)]['params'][0x1];if(_0x19cdd5===_0x1288ba(0x562))return $dataSystem[_0x1288ba(0x3e9)][_0x1288ba(0x9a1)][0x2];if(_0x19cdd5==='DEF')return $dataSystem[_0x1288ba(0x3e9)]['params'][0x3];if(_0x19cdd5===_0x1288ba(0x1e0))return $dataSystem[_0x1288ba(0x3e9)][_0x1288ba(0x9a1)][0x4];if(_0x19cdd5==='MDF')return $dataSystem[_0x1288ba(0x3e9)][_0x1288ba(0x9a1)][0x5];if(_0x19cdd5===_0x1288ba(0x4f0))return $dataSystem[_0x1288ba(0x3e9)][_0x1288ba(0x9a1)][0x6];if(_0x19cdd5===_0x1288ba(0x790))return $dataSystem[_0x1288ba(0x3e9)]['params'][0x7];if(_0x19cdd5==='HIT')return _0x21c187[_0x1288ba(0x5ba)];if(_0x19cdd5===_0x1288ba(0x6b1))return _0x21c187[_0x1288ba(0x8ae)];if(_0x19cdd5===_0x1288ba(0x84d))return _0x21c187['XParamVocab2'];if(_0x19cdd5===_0x1288ba(0x6ee))return _0x21c187[_0x1288ba(0x947)];if(_0x19cdd5===_0x1288ba(0x816))return _0x21c187[_0x1288ba(0x86b)];if(_0x19cdd5===_0x1288ba(0x5b2))return _0x21c187['XParamVocab5'];if(_0x19cdd5===_0x1288ba(0x904))return _0x21c187[_0x1288ba(0x5c3)];if(_0x19cdd5==='HRG')return _0x21c187[_0x1288ba(0x63f)];if(_0x19cdd5===_0x1288ba(0x558))return _0x21c187[_0x1288ba(0x96f)];if(_0x19cdd5==='TRG')return _0x21c187[_0x1288ba(0x956)];if(_0x19cdd5==='TGR')return _0x21c187[_0x1288ba(0x250)];if(_0x19cdd5==='GRD')return _0x21c187[_0x1288ba(0x5fd)];if(_0x19cdd5===_0x1288ba(0x397))return _0x21c187[_0x1288ba(0x298)];if(_0x19cdd5==='PHA')return _0x21c187[_0x1288ba(0x795)];if(_0x19cdd5===_0x1288ba(0x87f))return _0x21c187['SParamVocab4'];if(_0x19cdd5===_0x1288ba(0x3da))return _0x21c187[_0x1288ba(0x950)];if(_0x19cdd5===_0x1288ba(0x5b6))return _0x21c187[_0x1288ba(0x79a)];if(_0x19cdd5===_0x1288ba(0x7cb))return _0x21c187['SParamVocab7'];if(_0x19cdd5===_0x1288ba(0x909))return _0x21c187[_0x1288ba(0x3d1)];if(_0x19cdd5==='EXR')return _0x21c187[_0x1288ba(0x3ae)];if(VisuMZ['CoreEngine'][_0x1288ba(0x4d3)][_0x19cdd5])return VisuMZ[_0x1288ba(0x2df)]['CustomParamNames'][_0x19cdd5];return'';},TextManager[_0x4a5d62(0x52a)]=function(_0x5039fb){const _0x20b307=_0x4a5d62,_0xcb90e2=Input['getLastUsedGamepadType']();return _0xcb90e2===_0x20b307(0x3f5)?this[_0x20b307(0x970)](_0x5039fb):this[_0x20b307(0x1d3)](_0xcb90e2,_0x5039fb);},TextManager[_0x4a5d62(0x970)]=function(_0x14a799){const _0x162f3b=_0x4a5d62;let _0x50e69d=VisuMZ[_0x162f3b(0x2df)]['Settings']['ButtonAssist']['SplitEscape'];if(!_0x50e69d){if(_0x14a799==='cancel')_0x14a799=_0x162f3b(0x695);if(_0x14a799===_0x162f3b(0x2fa))_0x14a799=_0x162f3b(0x695);}let _0x542874=[];for(let _0x8e313b in Input[_0x162f3b(0x7ef)]){_0x8e313b=Number(_0x8e313b);if(_0x8e313b>=0x60&&_0x8e313b<=0x69)continue;if([0x12,0x20][_0x162f3b(0x1cd)](_0x8e313b))continue;_0x14a799===Input['keyMapper'][_0x8e313b]&&_0x542874[_0x162f3b(0x98c)](_0x8e313b);}for(let _0x4e87b1=0x0;_0x4e87b1<_0x542874[_0x162f3b(0x6d1)];_0x4e87b1++){_0x542874[_0x4e87b1]=TextManager[_0x162f3b(0x6ab)][_0x542874[_0x4e87b1]];}return this[_0x162f3b(0x3eb)](_0x542874);},TextManager[_0x4a5d62(0x3eb)]=function(_0x527cea){const _0x5cc788=_0x4a5d62,_0x173b12=VisuMZ['CoreEngine'][_0x5cc788(0x7d0)]['ButtonAssist'],_0x4fe732=_0x173b12[_0x5cc788(0x36e)];let _0x51e08b='';if(_0x527cea[_0x5cc788(0x1cd)]('UP'))_0x51e08b='UP';else{if(_0x527cea[_0x5cc788(0x1cd)](_0x5cc788(0x8a2)))_0x51e08b=_0x5cc788(0x8a2);else{if(_0x527cea['includes'](_0x5cc788(0x98e)))_0x51e08b=_0x5cc788(0x98e);else _0x527cea['includes'](_0x5cc788(0x7e1))?_0x51e08b=_0x5cc788(0x7e1):_0x51e08b=_0x527cea[_0x5cc788(0x6ef)]();}}const _0x2bbfb7=_0x5cc788(0x24e)[_0x5cc788(0x807)](_0x51e08b);return _0x173b12[_0x2bbfb7]?_0x173b12[_0x2bbfb7]:_0x4fe732[_0x5cc788(0x807)](_0x51e08b);},TextManager[_0x4a5d62(0x45f)]=function(_0x2b0eac,_0x30f353){const _0x3ec345=_0x4a5d62,_0x1e028f=VisuMZ[_0x3ec345(0x2df)][_0x3ec345(0x7d0)][_0x3ec345(0x8a1)],_0x371af6=_0x1e028f['MultiKeyFmt'],_0x3913a2=this[_0x3ec345(0x52a)](_0x2b0eac),_0x51a27f=this[_0x3ec345(0x52a)](_0x30f353);return _0x371af6['format'](_0x3913a2,_0x51a27f);},TextManager[_0x4a5d62(0x1d3)]=function(_0x2e0494,_0x401b5e){const _0x1b10e0=_0x4a5d62,_0x296a58=_0x2e0494['toLowerCase']()[_0x1b10e0(0x5d4)](),_0x28f334=VisuMZ[_0x1b10e0(0x2df)][_0x1b10e0(0x483)][_0x296a58];if(!_0x28f334)return this['getControllerInputButtonMatch'](_0x2e0494,_0x401b5e);return _0x28f334[_0x401b5e]||this['getKeyboardInputButtonString'](_0x2e0494,_0x401b5e);},TextManager[_0x4a5d62(0x3d0)]=function(_0x3de8c6,_0x3f3e6c){const _0xece771=_0x4a5d62,_0xbaf6dc=_0x3de8c6['toLowerCase']()[_0xece771(0x5d4)]();for(const _0x24ff40 in VisuMZ[_0xece771(0x2df)]['ControllerMatches']){if(_0xbaf6dc[_0xece771(0x1cd)](_0x24ff40)){const _0x947add=VisuMZ[_0xece771(0x2df)]['ControllerMatches'][_0x24ff40],_0x8e28b=VisuMZ[_0xece771(0x2df)][_0xece771(0x483)][_0x947add];return _0x8e28b[_0x3f3e6c]||this[_0xece771(0x970)](_0x3f3e6c);}}return this[_0xece771(0x970)](_0x3f3e6c);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x201)]=ColorManager[_0x4a5d62(0x838)],ColorManager[_0x4a5d62(0x838)]=function(){const _0x372114=_0x4a5d62;VisuMZ[_0x372114(0x2df)]['ColorManager_loadWindowskin'][_0x372114(0x35f)](this),this[_0x372114(0x48b)]=this[_0x372114(0x48b)]||{};},ColorManager['getColorDataFromPluginParameters']=function(_0x40caef,_0x5e46e3){const _0x513ac4=_0x4a5d62;return _0x5e46e3=String(_0x5e46e3),this[_0x513ac4(0x48b)]=this[_0x513ac4(0x48b)]||{},_0x5e46e3[_0x513ac4(0x245)](/#(.*)/i)?this[_0x513ac4(0x48b)][_0x40caef]=_0x513ac4(0x93a)['format'](String(RegExp['$1'])):this['_colorCache'][_0x40caef]=this[_0x513ac4(0x2a2)](Number(_0x5e46e3)),this[_0x513ac4(0x48b)][_0x40caef];},ColorManager[_0x4a5d62(0x485)]=function(_0x29d37e){const _0x370983=_0x4a5d62;return _0x29d37e=String(_0x29d37e),_0x29d37e[_0x370983(0x245)](/#(.*)/i)?_0x370983(0x93a)[_0x370983(0x807)](String(RegExp['$1'])):this['textColor'](Number(_0x29d37e));},ColorManager[_0x4a5d62(0x1ce)]=function(){const _0x43eb7b=_0x4a5d62;this[_0x43eb7b(0x48b)]={};},ColorManager[_0x4a5d62(0x770)]=function(){const _0x2d8b42=_0x4a5d62,_0x11fc63=_0x2d8b42(0x343);this[_0x2d8b42(0x48b)]=this['_colorCache']||{};if(this['_colorCache'][_0x11fc63])return this[_0x2d8b42(0x48b)][_0x11fc63];const _0x15414e=VisuMZ[_0x2d8b42(0x2df)]['Settings'][_0x2d8b42(0x34b)][_0x2d8b42(0x318)];return this[_0x2d8b42(0x96e)](_0x11fc63,_0x15414e);},ColorManager['systemColor']=function(){const _0x4b918c=_0x4a5d62,_0x1565eb=_0x4b918c(0x514);this['_colorCache']=this[_0x4b918c(0x48b)]||{};if(this[_0x4b918c(0x48b)][_0x1565eb])return this[_0x4b918c(0x48b)][_0x1565eb];const _0x216c22=VisuMZ['CoreEngine'][_0x4b918c(0x7d0)][_0x4b918c(0x34b)][_0x4b918c(0x92a)];return this[_0x4b918c(0x96e)](_0x1565eb,_0x216c22);},ColorManager[_0x4a5d62(0x5ad)]=function(){const _0x53ad39=_0x4a5d62,_0x1fcdf4=_0x53ad39(0x2d8);this[_0x53ad39(0x48b)]=this[_0x53ad39(0x48b)]||{};if(this[_0x53ad39(0x48b)][_0x1fcdf4])return this[_0x53ad39(0x48b)][_0x1fcdf4];const _0x2f360e=VisuMZ['CoreEngine']['Settings'][_0x53ad39(0x34b)][_0x53ad39(0x2f0)];return this[_0x53ad39(0x96e)](_0x1fcdf4,_0x2f360e);},ColorManager['deathColor']=function(){const _0x1e82af=_0x4a5d62,_0x364203=_0x1e82af(0x570);this[_0x1e82af(0x48b)]=this['_colorCache']||{};if(this[_0x1e82af(0x48b)][_0x364203])return this['_colorCache'][_0x364203];const _0x12582c=VisuMZ['CoreEngine']['Settings']['Color'][_0x1e82af(0x44f)];return this[_0x1e82af(0x96e)](_0x364203,_0x12582c);},ColorManager[_0x4a5d62(0x3c3)]=function(){const _0x508dc8=_0x4a5d62,_0x3508fb=_0x508dc8(0x8ba);this[_0x508dc8(0x48b)]=this[_0x508dc8(0x48b)]||{};if(this[_0x508dc8(0x48b)][_0x3508fb])return this[_0x508dc8(0x48b)][_0x3508fb];const _0x5dea22=VisuMZ[_0x508dc8(0x2df)]['Settings']['Color'][_0x508dc8(0x51e)];return this['getColorDataFromPluginParameters'](_0x3508fb,_0x5dea22);},ColorManager[_0x4a5d62(0x2bf)]=function(){const _0x53c39b=_0x4a5d62,_0x5eb52=_0x53c39b(0x7b3);this['_colorCache']=this[_0x53c39b(0x48b)]||{};if(this[_0x53c39b(0x48b)][_0x5eb52])return this[_0x53c39b(0x48b)][_0x5eb52];const _0x2ff21c=VisuMZ[_0x53c39b(0x2df)][_0x53c39b(0x7d0)][_0x53c39b(0x34b)][_0x53c39b(0x955)];return this[_0x53c39b(0x96e)](_0x5eb52,_0x2ff21c);},ColorManager['hpGaugeColor2']=function(){const _0x31af5b=_0x4a5d62,_0x56506e='_stored_hpGaugeColor2';this[_0x31af5b(0x48b)]=this[_0x31af5b(0x48b)]||{};if(this['_colorCache'][_0x56506e])return this[_0x31af5b(0x48b)][_0x56506e];const _0x2358e9=VisuMZ[_0x31af5b(0x2df)]['Settings']['Color'][_0x31af5b(0x80e)];return this[_0x31af5b(0x96e)](_0x56506e,_0x2358e9);},ColorManager[_0x4a5d62(0x55b)]=function(){const _0x1e3803=_0x4a5d62,_0x51e8b2='_stored_mpGaugeColor1';this[_0x1e3803(0x48b)]=this['_colorCache']||{};if(this[_0x1e3803(0x48b)][_0x51e8b2])return this['_colorCache'][_0x51e8b2];const _0x533d2d=VisuMZ[_0x1e3803(0x2df)][_0x1e3803(0x7d0)][_0x1e3803(0x34b)][_0x1e3803(0x5ab)];return this['getColorDataFromPluginParameters'](_0x51e8b2,_0x533d2d);},ColorManager['mpGaugeColor2']=function(){const _0x4f3ee5=_0x4a5d62,_0xdc235e=_0x4f3ee5(0x81a);this[_0x4f3ee5(0x48b)]=this[_0x4f3ee5(0x48b)]||{};if(this['_colorCache'][_0xdc235e])return this[_0x4f3ee5(0x48b)][_0xdc235e];const _0x2ac136=VisuMZ[_0x4f3ee5(0x2df)]['Settings'][_0x4f3ee5(0x34b)][_0x4f3ee5(0x786)];return this[_0x4f3ee5(0x96e)](_0xdc235e,_0x2ac136);},ColorManager[_0x4a5d62(0x674)]=function(){const _0x5ecdb8=_0x4a5d62,_0x28cd9b='_stored_mpCostColor';this[_0x5ecdb8(0x48b)]=this[_0x5ecdb8(0x48b)]||{};if(this[_0x5ecdb8(0x48b)][_0x28cd9b])return this[_0x5ecdb8(0x48b)][_0x28cd9b];const _0x5f4a8d=VisuMZ[_0x5ecdb8(0x2df)][_0x5ecdb8(0x7d0)][_0x5ecdb8(0x34b)][_0x5ecdb8(0x34d)];return this[_0x5ecdb8(0x96e)](_0x28cd9b,_0x5f4a8d);},ColorManager[_0x4a5d62(0x6fb)]=function(){const _0x34d9ff=_0x4a5d62,_0x4991ec='_stored_powerUpColor';this[_0x34d9ff(0x48b)]=this['_colorCache']||{};if(this[_0x34d9ff(0x48b)][_0x4991ec])return this[_0x34d9ff(0x48b)][_0x4991ec];const _0x2ebbee=VisuMZ[_0x34d9ff(0x2df)][_0x34d9ff(0x7d0)]['Color'][_0x34d9ff(0x4d7)];return this[_0x34d9ff(0x96e)](_0x4991ec,_0x2ebbee);},ColorManager[_0x4a5d62(0x836)]=function(){const _0x9b351d=_0x4a5d62,_0xa8162b=_0x9b351d(0x655);this[_0x9b351d(0x48b)]=this[_0x9b351d(0x48b)]||{};if(this[_0x9b351d(0x48b)][_0xa8162b])return this[_0x9b351d(0x48b)][_0xa8162b];const _0x11ba4b=VisuMZ[_0x9b351d(0x2df)][_0x9b351d(0x7d0)]['Color'][_0x9b351d(0x7f2)];return this[_0x9b351d(0x96e)](_0xa8162b,_0x11ba4b);},ColorManager[_0x4a5d62(0x2aa)]=function(){const _0x573294=_0x4a5d62,_0x31c3d9=_0x573294(0x6e3);this[_0x573294(0x48b)]=this[_0x573294(0x48b)]||{};if(this[_0x573294(0x48b)][_0x31c3d9])return this[_0x573294(0x48b)][_0x31c3d9];const _0x4f6a06=VisuMZ[_0x573294(0x2df)][_0x573294(0x7d0)][_0x573294(0x34b)][_0x573294(0x34e)];return this[_0x573294(0x96e)](_0x31c3d9,_0x4f6a06);},ColorManager[_0x4a5d62(0x4a1)]=function(){const _0x171e06=_0x4a5d62,_0x50bd39=_0x171e06(0x749);this['_colorCache']=this['_colorCache']||{};if(this[_0x171e06(0x48b)][_0x50bd39])return this[_0x171e06(0x48b)][_0x50bd39];const _0x270d19=VisuMZ['CoreEngine'][_0x171e06(0x7d0)]['Color'][_0x171e06(0x633)];return this[_0x171e06(0x96e)](_0x50bd39,_0x270d19);},ColorManager[_0x4a5d62(0x7bb)]=function(){const _0x3615a3=_0x4a5d62,_0x2c3f3a=_0x3615a3(0x1f1);this[_0x3615a3(0x48b)]=this[_0x3615a3(0x48b)]||{};if(this['_colorCache'][_0x2c3f3a])return this['_colorCache'][_0x2c3f3a];const _0x4f9de7=VisuMZ[_0x3615a3(0x2df)][_0x3615a3(0x7d0)][_0x3615a3(0x34b)]['ColorTPGauge1'];return this[_0x3615a3(0x96e)](_0x2c3f3a,_0x4f9de7);},ColorManager[_0x4a5d62(0x640)]=function(){const _0x30d2ec=_0x4a5d62,_0x1b1b96=_0x30d2ec(0x7b2);this[_0x30d2ec(0x48b)]=this[_0x30d2ec(0x48b)]||{};if(this[_0x30d2ec(0x48b)][_0x1b1b96])return this['_colorCache'][_0x1b1b96];const _0x37068b=VisuMZ[_0x30d2ec(0x2df)][_0x30d2ec(0x7d0)][_0x30d2ec(0x34b)]['ColorTPGauge2'];return this[_0x30d2ec(0x96e)](_0x1b1b96,_0x37068b);},ColorManager[_0x4a5d62(0x327)]=function(){const _0x58d313=_0x4a5d62,_0x487382=_0x58d313(0x934);this[_0x58d313(0x48b)]=this[_0x58d313(0x48b)]||{};if(this[_0x58d313(0x48b)][_0x487382])return this['_colorCache'][_0x487382];const _0x2936fc=VisuMZ[_0x58d313(0x2df)][_0x58d313(0x7d0)][_0x58d313(0x34b)][_0x58d313(0x54c)];return this[_0x58d313(0x96e)](_0x487382,_0x2936fc);},ColorManager[_0x4a5d62(0x7fc)]=function(){const _0x2fe1ea=_0x4a5d62,_0x457aa7='_stored_pendingColor';this['_colorCache']=this['_colorCache']||{};if(this[_0x2fe1ea(0x48b)][_0x457aa7])return this[_0x2fe1ea(0x48b)][_0x457aa7];const _0x2f68e5=VisuMZ[_0x2fe1ea(0x2df)][_0x2fe1ea(0x7d0)][_0x2fe1ea(0x34b)]['ColorTPCost'];return this[_0x2fe1ea(0x96e)](_0x457aa7,_0x2f68e5);},ColorManager[_0x4a5d62(0x382)]=function(){const _0x4e0cd7=_0x4a5d62,_0xdfb998=_0x4e0cd7(0x91c);this[_0x4e0cd7(0x48b)]=this[_0x4e0cd7(0x48b)]||{};if(this[_0x4e0cd7(0x48b)][_0xdfb998])return this[_0x4e0cd7(0x48b)][_0xdfb998];const _0x3a2d94=VisuMZ[_0x4e0cd7(0x2df)]['Settings']['Color'][_0x4e0cd7(0x2b1)];return this[_0x4e0cd7(0x96e)](_0xdfb998,_0x3a2d94);},ColorManager['expGaugeColor2']=function(){const _0x29ac9c=_0x4a5d62,_0x85e348=_0x29ac9c(0x903);this[_0x29ac9c(0x48b)]=this['_colorCache']||{};if(this['_colorCache'][_0x85e348])return this[_0x29ac9c(0x48b)][_0x85e348];const _0x1f97fa=VisuMZ[_0x29ac9c(0x2df)]['Settings'][_0x29ac9c(0x34b)][_0x29ac9c(0x249)];return this[_0x29ac9c(0x96e)](_0x85e348,_0x1f97fa);},ColorManager[_0x4a5d62(0x8eb)]=function(){const _0x558999=_0x4a5d62,_0x24ca8e=_0x558999(0x1f3);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x24ca8e])return this[_0x558999(0x48b)][_0x24ca8e];const _0x3548d4=VisuMZ[_0x558999(0x2df)][_0x558999(0x7d0)][_0x558999(0x34b)][_0x558999(0x709)];return this['getColorDataFromPluginParameters'](_0x24ca8e,_0x3548d4);},ColorManager[_0x4a5d62(0x2ea)]=function(){const _0x27ba25=_0x4a5d62,_0x2d0a5a='_stored_maxLvGaugeColor2';this[_0x27ba25(0x48b)]=this[_0x27ba25(0x48b)]||{};if(this[_0x27ba25(0x48b)][_0x2d0a5a])return this[_0x27ba25(0x48b)][_0x2d0a5a];const _0x2b58d0=VisuMZ[_0x27ba25(0x2df)][_0x27ba25(0x7d0)][_0x27ba25(0x34b)][_0x27ba25(0x1b2)];return this['getColorDataFromPluginParameters'](_0x2d0a5a,_0x2b58d0);},ColorManager[_0x4a5d62(0x825)]=function(_0x69b88a){const _0x5af01f=_0x4a5d62;return VisuMZ['CoreEngine'][_0x5af01f(0x7d0)][_0x5af01f(0x34b)][_0x5af01f(0x507)][_0x5af01f(0x35f)](this,_0x69b88a);},ColorManager[_0x4a5d62(0x2e4)]=function(_0x593f84){const _0x312e12=_0x4a5d62;return VisuMZ['CoreEngine'][_0x312e12(0x7d0)][_0x312e12(0x34b)][_0x312e12(0x36f)][_0x312e12(0x35f)](this,_0x593f84);},ColorManager['tpColor']=function(_0x1d5f21){const _0x3c6115=_0x4a5d62;return VisuMZ['CoreEngine'][_0x3c6115(0x7d0)][_0x3c6115(0x34b)][_0x3c6115(0x74c)][_0x3c6115(0x35f)](this,_0x1d5f21);},ColorManager['paramchangeTextColor']=function(_0x4d2d7e){const _0xeae73c=_0x4a5d62;return VisuMZ[_0xeae73c(0x2df)][_0xeae73c(0x7d0)][_0xeae73c(0x34b)][_0xeae73c(0x576)][_0xeae73c(0x35f)](this,_0x4d2d7e);},ColorManager[_0x4a5d62(0x5bd)]=function(_0x33c117){const _0x327062=_0x4a5d62;return VisuMZ['CoreEngine']['Settings']['Color'][_0x327062(0x993)][_0x327062(0x35f)](this,_0x33c117);},ColorManager[_0x4a5d62(0x968)]=function(){const _0x141ee6=_0x4a5d62;return VisuMZ[_0x141ee6(0x2df)]['Settings'][_0x141ee6(0x34b)][_0x141ee6(0x1ad)];},ColorManager['outlineColorDmg']=function(){const _0x1cde92=_0x4a5d62;return VisuMZ['CoreEngine'][_0x1cde92(0x7d0)]['Color'][_0x1cde92(0x700)]||_0x1cde92(0x83a);},ColorManager[_0x4a5d62(0x216)]=function(){const _0x5dc0a7=_0x4a5d62;return VisuMZ['CoreEngine'][_0x5dc0a7(0x7d0)][_0x5dc0a7(0x34b)][_0x5dc0a7(0x2fe)]||_0x5dc0a7(0x292);},ColorManager[_0x4a5d62(0x4fb)]=function(){const _0x3e905c=_0x4a5d62;return VisuMZ[_0x3e905c(0x2df)]['Settings']['Color'][_0x3e905c(0x619)];},ColorManager[_0x4a5d62(0x4dd)]=function(){const _0x170b0c=_0x4a5d62;return VisuMZ[_0x170b0c(0x2df)][_0x170b0c(0x7d0)][_0x170b0c(0x34b)][_0x170b0c(0x779)];},ColorManager[_0x4a5d62(0x4e5)]=function(){const _0x555110=_0x4a5d62;return VisuMZ[_0x555110(0x2df)][_0x555110(0x7d0)][_0x555110(0x34b)][_0x555110(0x282)];},ColorManager[_0x4a5d62(0x900)]=function(){const _0x133423=_0x4a5d62;return VisuMZ[_0x133423(0x2df)][_0x133423(0x7d0)][_0x133423(0x34b)]['ItemBackColor2'];},SceneManager['_storedStack']=[],SceneManager[_0x4a5d62(0x3a2)]=function(){const _0x35ba64=_0x4a5d62;return this[_0x35ba64(0x7d2)]&&this['_scene'][_0x35ba64(0x58b)]===Scene_Battle;},SceneManager[_0x4a5d62(0x89c)]=function(){const _0x233166=_0x4a5d62;return this[_0x233166(0x7d2)]&&this['_scene'][_0x233166(0x58b)]===Scene_Map;},SceneManager[_0x4a5d62(0x826)]=function(){const _0x41a0e6=_0x4a5d62;return this[_0x41a0e6(0x7d2)]&&this[_0x41a0e6(0x7d2)]instanceof Scene_Map;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x841)]=SceneManager[_0x4a5d62(0x96b)],SceneManager[_0x4a5d62(0x96b)]=function(){const _0x8ce9a7=_0x4a5d62;VisuMZ[_0x8ce9a7(0x2df)][_0x8ce9a7(0x841)][_0x8ce9a7(0x35f)](this),this[_0x8ce9a7(0x898)]();},VisuMZ['CoreEngine'][_0x4a5d62(0x52d)]=SceneManager[_0x4a5d62(0x964)],SceneManager[_0x4a5d62(0x964)]=function(_0x26b92b){const _0x2690a2=_0x4a5d62;if($gameTemp)this['onKeyDownKeysF6F7'](_0x26b92b);VisuMZ[_0x2690a2(0x2df)][_0x2690a2(0x52d)][_0x2690a2(0x35f)](this,_0x26b92b);},SceneManager[_0x4a5d62(0x302)]=function(_0x4f5478){const _0x19cf10=_0x4a5d62;if(!_0x4f5478[_0x19cf10(0x275)]&&!_0x4f5478[_0x19cf10(0x4bc)])switch(_0x4f5478['keyCode']){case 0x52:this['playTestShiftR']();break;case 0x54:this['playTestShiftT']();break;case 0x75:this[_0x19cf10(0x366)]();break;case 0x76:if(Input['isPressed'](_0x19cf10(0x388))||Input['isPressed'](_0x19cf10(0x662)))return;this[_0x19cf10(0x59a)]();break;}else{if(_0x4f5478[_0x19cf10(0x275)]){let _0x5c12b0=_0x4f5478[_0x19cf10(0x435)];if(_0x5c12b0>=0x31&&_0x5c12b0<=0x39){const _0x432807=_0x5c12b0-0x30;return SceneManager[_0x19cf10(0x991)](_0x432807);}else{if(_0x5c12b0>=0x61&&_0x5c12b0<=0x69){const _0x29ca2a=_0x5c12b0-0x60;return SceneManager[_0x19cf10(0x991)](_0x29ca2a);}}}}},SceneManager[_0x4a5d62(0x366)]=function(){const _0x54fcf7=_0x4a5d62;if($gameTemp[_0x54fcf7(0x84c)]()&&VisuMZ[_0x54fcf7(0x2df)][_0x54fcf7(0x7d0)]['QoL'][_0x54fcf7(0x840)]){ConfigManager[_0x54fcf7(0x948)]!==0x0?(ConfigManager[_0x54fcf7(0x93c)]=0x0,ConfigManager[_0x54fcf7(0x1eb)]=0x0,ConfigManager[_0x54fcf7(0x280)]=0x0,ConfigManager[_0x54fcf7(0x948)]=0x0):(ConfigManager['bgmVolume']=0x64,ConfigManager[_0x54fcf7(0x1eb)]=0x64,ConfigManager[_0x54fcf7(0x280)]=0x64,ConfigManager['seVolume']=0x64);ConfigManager[_0x54fcf7(0x495)]();if(this[_0x54fcf7(0x7d2)][_0x54fcf7(0x58b)]===Scene_Options){if(this[_0x54fcf7(0x7d2)][_0x54fcf7(0x70d)])this['_scene'][_0x54fcf7(0x70d)][_0x54fcf7(0x278)]();if(this[_0x54fcf7(0x7d2)]['_listWindow'])this[_0x54fcf7(0x7d2)][_0x54fcf7(0x780)][_0x54fcf7(0x278)]();}}},SceneManager[_0x4a5d62(0x59a)]=function(){const _0x166293=_0x4a5d62;$gameTemp[_0x166293(0x84c)]()&&VisuMZ[_0x166293(0x2df)]['Settings'][_0x166293(0x235)][_0x166293(0x4b4)]&&($gameTemp[_0x166293(0x646)]=!$gameTemp[_0x166293(0x646)]);},SceneManager[_0x4a5d62(0x6c7)]=function(){const _0x4e8b7a=_0x4a5d62;if(!VisuMZ[_0x4e8b7a(0x2df)][_0x4e8b7a(0x7d0)][_0x4e8b7a(0x235)][_0x4e8b7a(0x479)])return;if(!$gameTemp[_0x4e8b7a(0x84c)]())return;if(!SceneManager[_0x4e8b7a(0x3a2)]())return;if(!Input[_0x4e8b7a(0x890)](_0x4e8b7a(0x388)))return;for(const _0x50ee0e of $gameParty[_0x4e8b7a(0x7b1)]()){if(!_0x50ee0e)continue;_0x50ee0e[_0x4e8b7a(0x6ce)]();}},SceneManager[_0x4a5d62(0x888)]=function(){const _0x362528=_0x4a5d62;if(!VisuMZ['CoreEngine'][_0x362528(0x7d0)][_0x362528(0x235)]['ShiftT_Toggle'])return;if(!$gameTemp[_0x362528(0x84c)]())return;if(!SceneManager['isSceneBattle']())return;if(!Input[_0x362528(0x890)](_0x362528(0x388)))return;for(const _0x5dd03b of $gameParty['members']()){if(!_0x5dd03b)continue;_0x5dd03b[_0x362528(0x7e0)](_0x5dd03b[_0x362528(0x66d)]());}},SceneManager[_0x4a5d62(0x991)]=function(_0x6c3fc5){const _0x930d4e=_0x4a5d62;if(!$gameTemp[_0x930d4e(0x84c)]())return;if(!DataManager[_0x930d4e(0x4b8)](_0x6c3fc5))return;if(!(VisuMZ[_0x930d4e(0x2df)][_0x930d4e(0x7d0)][_0x930d4e(0x235)]['CtrlQuickLoad']??!![]))return;this[_0x930d4e(0x98c)](Scene_QuickLoad),this[_0x930d4e(0x6f8)](_0x6c3fc5);},SceneManager['initVisuMZCoreEngine']=function(){const _0x17be6d=_0x4a5d62;this[_0x17be6d(0x1be)]=![],this[_0x17be6d(0x8e1)]=!VisuMZ[_0x17be6d(0x2df)]['Settings']['UI']['ShowButtons'];},SceneManager['setSideButtonLayout']=function(_0x2f8482){const _0x203ecd=_0x4a5d62;VisuMZ[_0x203ecd(0x2df)][_0x203ecd(0x7d0)]['UI'][_0x203ecd(0x75f)]&&(this[_0x203ecd(0x1be)]=_0x2f8482);},SceneManager[_0x4a5d62(0x425)]=function(){return this['_sideButtonLayout'];},SceneManager['areButtonsHidden']=function(){const _0x4d824e=_0x4a5d62;return this[_0x4d824e(0x8e1)];},SceneManager[_0x4a5d62(0x744)]=function(){return this['areButtonsHidden']()||this['isSideButtonLayout']();},VisuMZ['CoreEngine'][_0x4a5d62(0x329)]=SceneManager[_0x4a5d62(0x5a2)],SceneManager[_0x4a5d62(0x5a2)]=function(){const _0x58a608=_0x4a5d62;return VisuMZ[_0x58a608(0x2df)][_0x58a608(0x7d0)][_0x58a608(0x235)][_0x58a608(0x4e3)]?VisuMZ['CoreEngine'][_0x58a608(0x329)][_0x58a608(0x35f)](this):!![];},SceneManager[_0x4a5d62(0x747)]=function(_0x25a2b0){const _0xcfa22e=_0x4a5d62;if(_0x25a2b0 instanceof Error)this[_0xcfa22e(0x65d)](_0x25a2b0);else _0x25a2b0 instanceof Array&&_0x25a2b0[0x0]===_0xcfa22e(0x35b)?this[_0xcfa22e(0x7a8)](_0x25a2b0):this[_0xcfa22e(0x6e7)](_0x25a2b0);this['stop']();},VisuMZ['CoreEngine']['BattleManager_processEscape']=BattleManager[_0x4a5d62(0x887)],BattleManager[_0x4a5d62(0x887)]=function(){const _0x3bbbd7=_0x4a5d62;return VisuMZ['CoreEngine'][_0x3bbbd7(0x7d0)][_0x3bbbd7(0x235)][_0x3bbbd7(0x8e9)]?this['processAlwaysEscape']():VisuMZ[_0x3bbbd7(0x2df)][_0x3bbbd7(0x644)][_0x3bbbd7(0x35f)](this);},BattleManager[_0x4a5d62(0x394)]=function(){const _0x268e5c=_0x4a5d62;return $gameParty[_0x268e5c(0x75a)](),SoundManager[_0x268e5c(0x69c)](),this[_0x268e5c(0x89a)](),!![];},BattleManager[_0x4a5d62(0x5a7)]=function(){const _0x53a36f=_0x4a5d62;return $gameSystem[_0x53a36f(0x5e2)]()>=0x1;},BattleManager[_0x4a5d62(0x314)]=function(){const _0xf1f2d5=_0x4a5d62;return $gameSystem[_0xf1f2d5(0x5e2)]()===0x1;},VisuMZ['CoreEngine'][_0x4a5d62(0x90e)]=Game_Temp['prototype'][_0x4a5d62(0x96b)],Game_Temp[_0x4a5d62(0x5da)]['initialize']=function(){const _0xe9196f=_0x4a5d62;VisuMZ[_0xe9196f(0x2df)][_0xe9196f(0x90e)][_0xe9196f(0x35f)](this),this[_0xe9196f(0x833)](),this['createFauxAnimationQueue'](),this[_0xe9196f(0x465)]();},Game_Temp[_0x4a5d62(0x5da)][_0x4a5d62(0x833)]=function(){const _0x31809e=_0x4a5d62;VisuMZ[_0x31809e(0x2df)]['Settings'][_0x31809e(0x235)]['ForceNoPlayTest']&&(this['_isPlaytest']=![]);},Game_Temp[_0x4a5d62(0x5da)][_0x4a5d62(0x6c4)]=function(_0x29b5df){const _0x1bc2f9=_0x4a5d62;this[_0x1bc2f9(0x25d)]=_0x29b5df;},Game_Temp['prototype'][_0x4a5d62(0x620)]=function(){const _0x39c292=_0x4a5d62;return this[_0x39c292(0x25d)];},Game_Temp[_0x4a5d62(0x5da)][_0x4a5d62(0x568)]=function(){const _0x365cf5=_0x4a5d62;this[_0x365cf5(0x532)]=undefined,this[_0x365cf5(0x5b1)]=undefined,this['_forcedBattleGridSystem']=undefined;},Game_Temp[_0x4a5d62(0x5da)]['applyForcedGameTroopSettingsCoreEngine']=function(_0x4a9e16){const _0x376ccb=_0x4a5d62;$gameMap&&$dataMap&&$dataMap['note']&&this[_0x376ccb(0x477)]($dataMap[_0x376ccb(0x6c6)]);const _0xa1b268=$dataTroops[_0x4a9e16];if(_0xa1b268){let _0x1afcc3=DataManager[_0x376ccb(0x239)](_0xa1b268['id']);this[_0x376ccb(0x477)](_0x1afcc3);}},Game_Temp[_0x4a5d62(0x5da)][_0x4a5d62(0x477)]=function(_0x1e8d41){const _0x25b41f=_0x4a5d62;if(!_0x1e8d41)return;if(_0x1e8d41['match'](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x25b41f(0x532)]='FV';else{if(_0x1e8d41[_0x25b41f(0x245)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x25b41f(0x532)]='SV';else{if(_0x1e8d41['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x4740d3=String(RegExp['$1']);if(_0x4740d3['match'](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x25b41f(0x532)]='FV';else _0x4740d3[_0x25b41f(0x245)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x25b41f(0x532)]='SV');}}}if(_0x1e8d41['match'](/<(?:DTB)>/i))this[_0x25b41f(0x5b1)]=0x0;else{if(_0x1e8d41[_0x25b41f(0x245)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x25b41f(0x5b1)]=0x1;else{if(_0x1e8d41['match'](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x25b41f(0x5b1)]=0x2;else{if(_0x1e8d41[_0x25b41f(0x245)](/<(?:TPB|ATB)>/i))this['_forcedBattleSys']=0x2;else{if(_0x1e8d41[_0x25b41f(0x245)](/<(?:CTB)>/i))Imported['VisuMZ_2_BattleSystemCTB']&&(this['_forcedBattleSys']=_0x25b41f(0x95a));else{if(_0x1e8d41[_0x25b41f(0x245)](/<(?:STB)>/i))Imported[_0x25b41f(0x4f2)]&&(this[_0x25b41f(0x5b1)]=_0x25b41f(0x7d9));else{if(_0x1e8d41['match'](/<(?:BTB)>/i))Imported[_0x25b41f(0x8c3)]&&(this[_0x25b41f(0x5b1)]=_0x25b41f(0x64c));else{if(_0x1e8d41['match'](/<(?:FTB)>/i))Imported[_0x25b41f(0x546)]&&(this[_0x25b41f(0x5b1)]='FTB');else{if(_0x1e8d41[_0x25b41f(0x245)](/<(?:OTB)>/i))Imported[_0x25b41f(0x725)]&&(this[_0x25b41f(0x5b1)]=_0x25b41f(0x40a));else{if(_0x1e8d41[_0x25b41f(0x245)](/<(?:ETB)>/i))Imported[_0x25b41f(0x874)]&&(this[_0x25b41f(0x5b1)]=_0x25b41f(0x6c2));else{if(_0x1e8d41[_0x25b41f(0x245)](/<(?:PTB)>/i))Imported['VisuMZ_2_BattleSystemPTB']&&(this['_forcedBattleSys']=_0x25b41f(0x363));else{if(_0x1e8d41[_0x25b41f(0x245)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x14e017=String(RegExp['$1']);if(_0x14e017['match'](/DTB/i))this['_forcedBattleSys']=0x0;else{if(_0x14e017[_0x25b41f(0x245)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x25b41f(0x5b1)]=0x1;else{if(_0x14e017[_0x25b41f(0x245)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x25b41f(0x5b1)]=0x2;else{if(_0x14e017['match'](/CTB/i))Imported[_0x25b41f(0x8b9)]&&(this[_0x25b41f(0x5b1)]=_0x25b41f(0x95a));else{if(_0x14e017[_0x25b41f(0x245)](/STB/i))Imported[_0x25b41f(0x4f2)]&&(this[_0x25b41f(0x5b1)]=_0x25b41f(0x7d9));else{if(_0x14e017['match'](/BTB/i))Imported['VisuMZ_2_BattleSystemBTB']&&(this['_forcedBattleSys']='BTB');else{if(_0x14e017[_0x25b41f(0x245)](/FTB/i))Imported[_0x25b41f(0x546)]&&(this[_0x25b41f(0x5b1)]=_0x25b41f(0x498));else{if(_0x14e017['match'](/OTB/i))Imported[_0x25b41f(0x725)]&&(this[_0x25b41f(0x5b1)]=_0x25b41f(0x40a));else{if(_0x14e017['match'](/ETB/i))Imported[_0x25b41f(0x874)]&&(this[_0x25b41f(0x5b1)]=_0x25b41f(0x6c2));else _0x14e017[_0x25b41f(0x245)](/PTB/i)&&(Imported[_0x25b41f(0x618)]&&(this[_0x25b41f(0x5b1)]=_0x25b41f(0x363)));}}}}}}}}}}}}}}}}}}}}if(_0x1e8d41[_0x25b41f(0x245)](/<(?:|BATTLE )GRID>/i))this[_0x25b41f(0x741)]=!![];else _0x1e8d41['match'](/<NO (?:|BATTLE )GRID>/i)&&(this[_0x25b41f(0x741)]=![]);},Game_Temp['prototype']['createFauxAnimationQueue']=function(){const _0x3fcbd5=_0x4a5d62;this[_0x3fcbd5(0x39e)]=[];},Game_Temp[_0x4a5d62(0x5da)][_0x4a5d62(0x616)]=function(_0x1cd444,_0x250d21,_0x51692c,_0x42c27f){const _0x546c11=_0x4a5d62;if(!this['showFauxAnimations']())return;_0x51692c=_0x51692c||![],_0x42c27f=_0x42c27f||![];if($dataAnimations[_0x250d21]){const _0x130107={'targets':_0x1cd444,'animationId':_0x250d21,'mirror':_0x51692c,'mute':_0x42c27f};this[_0x546c11(0x39e)]['push'](_0x130107);for(const _0x468301 of _0x1cd444){_0x468301[_0x546c11(0x463)]&&_0x468301['startAnimation']();}}},Game_Temp[_0x4a5d62(0x5da)]['showFauxAnimations']=function(){return!![];},Game_Temp['prototype'][_0x4a5d62(0x28c)]=function(){const _0x4e81b3=_0x4a5d62;return this['_fauxAnimationQueue'][_0x4e81b3(0x388)]();},Game_Temp[_0x4a5d62(0x5da)][_0x4a5d62(0x465)]=function(){const _0x2e6aeb=_0x4a5d62;this[_0x2e6aeb(0x49c)]=[];},Game_Temp[_0x4a5d62(0x5da)][_0x4a5d62(0x33d)]=function(_0x2cddcc,_0x2dcf8c,_0x5563b2,_0x4b54c0,_0x5cb52c){const _0x1d7796=_0x4a5d62;if(!this[_0x1d7796(0x660)]())return;_0x4b54c0=_0x4b54c0||![],_0x5cb52c=_0x5cb52c||![];if($dataAnimations[_0x5563b2]){const _0xa666a={'x':_0x2cddcc,'y':_0x2dcf8c,'animationId':_0x5563b2,'mirror':_0x4b54c0,'mute':_0x5cb52c};this[_0x1d7796(0x49c)][_0x1d7796(0x98c)](_0xa666a);}},Game_Temp['prototype'][_0x4a5d62(0x660)]=function(){return!![];},Game_Temp['prototype']['retrievePointAnimation']=function(){const _0x4109a1=_0x4a5d62;return this[_0x4109a1(0x49c)][_0x4109a1(0x388)]();},VisuMZ['CoreEngine']['Game_System_initialize']=Game_System[_0x4a5d62(0x5da)]['initialize'],Game_System[_0x4a5d62(0x5da)][_0x4a5d62(0x96b)]=function(){const _0x280823=_0x4a5d62;VisuMZ[_0x280823(0x2df)]['Game_System_initialize'][_0x280823(0x35f)](this),this[_0x280823(0x27c)]();},Game_System['prototype'][_0x4a5d62(0x27c)]=function(){const _0x34d2c1=_0x4a5d62;this[_0x34d2c1(0x4b6)]={'SideView':$dataSystem[_0x34d2c1(0x5f7)],'BattleSystem':this[_0x34d2c1(0x8f4)](),'FontSize':$dataSystem[_0x34d2c1(0x897)]['fontSize'],'Padding':0xc};},Game_System['prototype'][_0x4a5d62(0x946)]=function(){const _0xbf0073=_0x4a5d62;if($gameTemp['_forcedTroopView']==='SV')return!![];else{if($gameTemp['_forcedTroopView']==='FV')return![];}if(this[_0xbf0073(0x4b6)]===undefined)this[_0xbf0073(0x27c)]();if(this[_0xbf0073(0x4b6)][_0xbf0073(0x4df)]===undefined)this[_0xbf0073(0x27c)]();return this['_CoreEngineSettings'][_0xbf0073(0x4df)];},Game_System['prototype'][_0x4a5d62(0x325)]=function(_0x13dce){const _0x2cc76d=_0x4a5d62;if(this['_CoreEngineSettings']===undefined)this[_0x2cc76d(0x27c)]();if(this[_0x2cc76d(0x4b6)][_0x2cc76d(0x4df)]===undefined)this[_0x2cc76d(0x27c)]();this[_0x2cc76d(0x4b6)][_0x2cc76d(0x4df)]=_0x13dce;},Game_System[_0x4a5d62(0x5da)][_0x4a5d62(0x6df)]=function(){const _0x24e435=_0x4a5d62;if(this[_0x24e435(0x4b6)]===undefined)this[_0x24e435(0x27c)]();this[_0x24e435(0x4b6)]['BattleSystem']=this['initialBattleSystem']();},Game_System[_0x4a5d62(0x5da)][_0x4a5d62(0x8f4)]=function(){const _0x4c3167=_0x4a5d62,_0x5c4cd0=(VisuMZ['CoreEngine']['Settings'][_0x4c3167(0x742)]||_0x4c3167(0x78a))['toUpperCase']()['trim']();return VisuMZ[_0x4c3167(0x2df)]['CreateBattleSystemID'](_0x5c4cd0);},Game_System[_0x4a5d62(0x5da)][_0x4a5d62(0x5e2)]=function(){const _0x244eb9=_0x4a5d62;if($gameTemp['_forcedBattleSys']!==undefined)return $gameTemp[_0x244eb9(0x5b1)];if(this[_0x244eb9(0x4b6)]===undefined)this[_0x244eb9(0x27c)]();if(this['_CoreEngineSettings'][_0x244eb9(0x742)]===undefined)this[_0x244eb9(0x6df)]();return this[_0x244eb9(0x4b6)][_0x244eb9(0x742)];},Game_System['prototype'][_0x4a5d62(0x52f)]=function(_0x31b619){const _0x1e8d04=_0x4a5d62;if(this[_0x1e8d04(0x4b6)]===undefined)this[_0x1e8d04(0x27c)]();if(this[_0x1e8d04(0x4b6)]['BattleSystem']===undefined)this[_0x1e8d04(0x6df)]();this[_0x1e8d04(0x4b6)][_0x1e8d04(0x742)]=_0x31b619;},Game_System[_0x4a5d62(0x5da)][_0x4a5d62(0x76c)]=function(){const _0x512ec5=_0x4a5d62;if(this[_0x512ec5(0x4b6)]===undefined)this[_0x512ec5(0x27c)]();if(this[_0x512ec5(0x4b6)]['FontSize']===undefined)this[_0x512ec5(0x27c)]();return this[_0x512ec5(0x4b6)][_0x512ec5(0x603)];},Game_System[_0x4a5d62(0x5da)]['setMainFontSize']=function(_0x5ecfad){const _0x30e778=_0x4a5d62;if(this[_0x30e778(0x4b6)]===undefined)this[_0x30e778(0x27c)]();if(this[_0x30e778(0x4b6)]['TimeProgress']===undefined)this['initCoreEngine']();this[_0x30e778(0x4b6)][_0x30e778(0x603)]=_0x5ecfad;},Game_System['prototype'][_0x4a5d62(0x3b6)]=function(){const _0x391d43=_0x4a5d62;if(this[_0x391d43(0x4b6)]===undefined)this['initCoreEngine']();if(this[_0x391d43(0x4b6)][_0x391d43(0x4cb)]===undefined)this[_0x391d43(0x27c)]();return this[_0x391d43(0x4b6)][_0x391d43(0x4cb)];},Game_System[_0x4a5d62(0x5da)][_0x4a5d62(0x6b4)]=function(_0x59cf75){const _0xb25147=_0x4a5d62;if(this[_0xb25147(0x4b6)]===undefined)this[_0xb25147(0x27c)]();if(this[_0xb25147(0x4b6)][_0xb25147(0x45d)]===undefined)this[_0xb25147(0x27c)]();this[_0xb25147(0x4b6)][_0xb25147(0x4cb)]=_0x59cf75;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x5b7)]=Game_Screen[_0x4a5d62(0x5da)][_0x4a5d62(0x96b)],Game_Screen['prototype']['initialize']=function(){const _0x3104fc=_0x4a5d62;VisuMZ[_0x3104fc(0x2df)]['Game_Screen_initialize'][_0x3104fc(0x35f)](this),this[_0x3104fc(0x882)]();},Game_Screen['prototype']['initCoreEngineScreenShake']=function(){const _0x5c622d=_0x4a5d62,_0x18728d=VisuMZ[_0x5c622d(0x2df)][_0x5c622d(0x7d0)]['ScreenShake'];this['_coreEngineShakeStyle']=_0x18728d?.['DefaultStyle']||_0x5c622d(0x1cf);},Game_Screen[_0x4a5d62(0x5da)][_0x4a5d62(0x96d)]=function(){const _0x3f9bb4=_0x4a5d62;if(this['_coreEngineShakeStyle']===undefined)this[_0x3f9bb4(0x882)]();return this[_0x3f9bb4(0x438)];},Game_Screen['prototype'][_0x4a5d62(0x719)]=function(_0x2de800){const _0x30ddfa=_0x4a5d62;if(this[_0x30ddfa(0x438)]===undefined)this[_0x30ddfa(0x882)]();this[_0x30ddfa(0x438)]=_0x2de800[_0x30ddfa(0x545)]()[_0x30ddfa(0x5d4)]();},Game_Picture['prototype'][_0x4a5d62(0x454)]=function(){const _0x43a1e2=_0x4a5d62;if($gameParty['inBattle']())return![];return this[_0x43a1e2(0x580)]()&&this['onlyfilename']()[_0x43a1e2(0x97c)](0x0)==='!';},Game_Picture[_0x4a5d62(0x5da)]['onlyfilename']=function(){const _0x576e24=_0x4a5d62;return this[_0x576e24(0x5d2)][_0x576e24(0x89f)]('/')[_0x576e24(0x6ef)]();},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x28b)]=Game_Picture[_0x4a5d62(0x5da)]['x'],Game_Picture[_0x4a5d62(0x5da)]['x']=function(){const _0x5080b5=_0x4a5d62;return this[_0x5080b5(0x454)]()?this['xScrollLinkedOffset']():VisuMZ[_0x5080b5(0x2df)][_0x5080b5(0x28b)][_0x5080b5(0x35f)](this);},Game_Picture['prototype'][_0x4a5d62(0x839)]=function(){const _0x4363a8=_0x4a5d62,_0x4603b8=$gameMap[_0x4363a8(0x729)]()*$gameMap['tileWidth']();return(this['_x']-_0x4603b8)*$gameScreen[_0x4363a8(0x1ac)]();},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x678)]=Game_Picture[_0x4a5d62(0x5da)]['y'],Game_Picture[_0x4a5d62(0x5da)]['y']=function(){const _0x25ad48=_0x4a5d62;return this['isMapScrollLinked']()?this[_0x25ad48(0x62b)]():VisuMZ['CoreEngine'][_0x25ad48(0x678)]['call'](this);},Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x62b)]=function(){const _0x42de91=_0x4a5d62,_0x43bde4=$gameMap['displayY']()*$gameMap['tileHeight']();return(this['_y']-_0x43bde4)*$gameScreen[_0x42de91(0x1ac)]();},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x8e3)]=Game_Picture['prototype'][_0x4a5d62(0x2f4)],Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x2f4)]=function(){const _0x5e7c52=_0x4a5d62;let _0x220c85=VisuMZ['CoreEngine'][_0x5e7c52(0x8e3)][_0x5e7c52(0x35f)](this);return this['isMapScrollLinked']()&&(_0x220c85*=$gameScreen[_0x5e7c52(0x1ac)]()),_0x220c85;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x924)]=Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x5fa)],Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x5fa)]=function(){const _0xe143f1=_0x4a5d62;let _0x2f9623=VisuMZ['CoreEngine']['Game_Picture_scaleY'][_0xe143f1(0x35f)](this);return this[_0xe143f1(0x454)]()&&(_0x2f9623*=$gameScreen[_0xe143f1(0x1ac)]()),_0x2f9623;},Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x5d9)]=function(_0x2758db){const _0x221c8d=_0x4a5d62;this[_0x221c8d(0x7d3)]=_0x2758db;},VisuMZ['CoreEngine'][_0x4a5d62(0x5bf)]=Game_Picture['prototype'][_0x4a5d62(0x411)],Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x411)]=function(_0x374b66){const _0x3f7bba=_0x4a5d62;return this[_0x3f7bba(0x7d3)]=this[_0x3f7bba(0x7d3)]||0x0,[0x0,0x1,0x2,0x3]['includes'](this[_0x3f7bba(0x7d3)])?VisuMZ[_0x3f7bba(0x2df)][_0x3f7bba(0x5bf)][_0x3f7bba(0x35f)](this,_0x374b66):VisuMZ[_0x3f7bba(0x65a)](_0x374b66,this[_0x3f7bba(0x7d3)]);},VisuMZ['CoreEngine'][_0x4a5d62(0x608)]=Game_Picture['prototype'][_0x4a5d62(0x44b)],Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x44b)]=function(){const _0xe4d954=_0x4a5d62;VisuMZ['CoreEngine'][_0xe4d954(0x608)][_0xe4d954(0x35f)](this),this['initRotationCoreEngine']();},Game_Picture['prototype']['initRotationCoreEngine']=function(){this['_anglePlus']={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':'Linear'};},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x64a)]=Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x530)],Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x530)]=function(){const _0x3c0e2a=_0x4a5d62;let _0xaa8cf1=VisuMZ[_0x3c0e2a(0x2df)][_0x3c0e2a(0x64a)]['call'](this);return _0xaa8cf1+=this[_0x3c0e2a(0x59b)](),_0xaa8cf1;},Game_Picture['prototype'][_0x4a5d62(0x59b)]=function(){const _0x546888=_0x4a5d62;if(this[_0x546888(0x6a8)]===undefined)this[_0x546888(0x6e9)]();return this['_anglePlus'][_0x546888(0x2d9)]||0x0;},Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x62c)]=function(_0xe5f576,_0x4dbb76,_0x446d3b){const _0x2d3d2f=_0x4a5d62;if(this[_0x2d3d2f(0x6a8)]===undefined)this['initRotationCoreEngine']();this[_0x2d3d2f(0x6a8)][_0x2d3d2f(0x22d)]=_0xe5f576||0x0,this[_0x2d3d2f(0x6a8)]['duration']=_0x4dbb76||0x0,this[_0x2d3d2f(0x6a8)][_0x2d3d2f(0x359)]=_0x4dbb76||0x0,this[_0x2d3d2f(0x6a8)][_0x2d3d2f(0x693)]=_0x446d3b||_0x2d3d2f(0x1b6),_0x4dbb76<=0x0&&(this['_anglePlus']['current']=this[_0x2d3d2f(0x6a8)][_0x2d3d2f(0x22d)]);},Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x8d8)]=function(_0xf5013a,_0x3948ae,_0x55567e){const _0x58d335=_0x4a5d62;if(this[_0x58d335(0x6a8)]===undefined)this[_0x58d335(0x6e9)]();this['_anglePlus'][_0x58d335(0x22d)]+=_0xf5013a||0x0,this[_0x58d335(0x6a8)]['duration']=_0x3948ae||0x0,this[_0x58d335(0x6a8)]['wholeDuration']=_0x3948ae||0x0,this[_0x58d335(0x6a8)]['easingType']=_0x55567e||_0x58d335(0x1b6),_0x3948ae<=0x0&&(this[_0x58d335(0x6a8)][_0x58d335(0x2d9)]=this[_0x58d335(0x6a8)]['target']);},VisuMZ[_0x4a5d62(0x2df)]['Game_Picture_updateRotation']=Game_Picture[_0x4a5d62(0x5da)]['updateRotation'],Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x58e)]=function(){const _0x3d1376=_0x4a5d62;VisuMZ[_0x3d1376(0x2df)][_0x3d1376(0x317)][_0x3d1376(0x35f)](this),this[_0x3d1376(0x38b)]();},Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x38b)]=function(){const _0x21ddf1=_0x4a5d62;if(this['_anglePlus']===undefined)this[_0x21ddf1(0x6e9)]();const _0x48b6e2=this[_0x21ddf1(0x6a8)];if(_0x48b6e2['duration']<=0x0)return;_0x48b6e2[_0x21ddf1(0x2d9)]=this[_0x21ddf1(0x31a)](_0x48b6e2[_0x21ddf1(0x2d9)],_0x48b6e2[_0x21ddf1(0x22d)]),_0x48b6e2[_0x21ddf1(0x715)]--,_0x48b6e2[_0x21ddf1(0x715)]<=0x0&&(_0x48b6e2[_0x21ddf1(0x2d9)]=_0x48b6e2[_0x21ddf1(0x22d)]);},Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x31a)]=function(_0x29fc9b,_0x116df5){const _0x58b0ac=_0x4a5d62,_0x46815d=this[_0x58b0ac(0x6a8)],_0x23aacd=_0x46815d['easingType'],_0x4bb816=_0x46815d[_0x58b0ac(0x715)],_0x234edb=_0x46815d[_0x58b0ac(0x359)],_0x9fc03b=VisuMZ[_0x58b0ac(0x65a)]((_0x234edb-_0x4bb816)/_0x234edb,_0x23aacd),_0x102912=VisuMZ[_0x58b0ac(0x65a)]((_0x234edb-_0x4bb816+0x1)/_0x234edb,_0x23aacd),_0x4b4ec8=(_0x29fc9b-_0x116df5*_0x9fc03b)/(0x1-_0x9fc03b);return _0x4b4ec8+(_0x116df5-_0x4b4ec8)*_0x102912;},VisuMZ[_0x4a5d62(0x2df)]['Game_Action_itemHit']=Game_Action['prototype'][_0x4a5d62(0x265)],Game_Action[_0x4a5d62(0x5da)][_0x4a5d62(0x265)]=function(_0xf4b6f8){const _0x50d025=_0x4a5d62;return VisuMZ[_0x50d025(0x2df)][_0x50d025(0x7d0)][_0x50d025(0x235)]['ImprovedAccuracySystem']?this[_0x50d025(0x213)](_0xf4b6f8):VisuMZ[_0x50d025(0x2df)][_0x50d025(0x258)][_0x50d025(0x35f)](this,_0xf4b6f8);},Game_Action[_0x4a5d62(0x5da)][_0x4a5d62(0x213)]=function(_0x23d2e1){const _0xf2178c=this['itemSuccessRate'](_0x23d2e1),_0x363af8=this['subjectHitRate'](_0x23d2e1),_0x59e86b=this['targetEvaRate'](_0x23d2e1);return _0xf2178c*(_0x363af8-_0x59e86b);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x5e5)]=Game_Action[_0x4a5d62(0x5da)][_0x4a5d62(0x4ca)],Game_Action['prototype']['itemEva']=function(_0x59a904){const _0x5e8c77=_0x4a5d62;return VisuMZ[_0x5e8c77(0x2df)]['Settings'][_0x5e8c77(0x235)][_0x5e8c77(0x571)]?0x0:VisuMZ['CoreEngine'][_0x5e8c77(0x5e5)][_0x5e8c77(0x35f)](this,_0x59a904);},Game_Action['prototype'][_0x4a5d62(0x4f8)]=function(_0x3f04ce){const _0x5c9920=_0x4a5d62;return this[_0x5c9920(0x6be)]()[_0x5c9920(0x821)]*0.01;},Game_Action['prototype'][_0x4a5d62(0x7ec)]=function(_0x1b45b2){const _0x44fe98=_0x4a5d62;if(VisuMZ[_0x44fe98(0x2df)]['Settings'][_0x44fe98(0x235)]['AccuracyBoost']&&this[_0x44fe98(0x3dd)]())return 0x1;return this[_0x44fe98(0x910)]()?VisuMZ[_0x44fe98(0x2df)][_0x44fe98(0x7d0)][_0x44fe98(0x235)][_0x44fe98(0x80f)]&&this[_0x44fe98(0x303)]()[_0x44fe98(0x958)]()?this['subject']()['hit']+0.05:this[_0x44fe98(0x303)]()[_0x44fe98(0x345)]:0x1;},Game_Action[_0x4a5d62(0x5da)]['targetEvaRate']=function(_0xb00a21){const _0x5164be=_0x4a5d62;if(this[_0x5164be(0x303)]()[_0x5164be(0x958)]()===_0xb00a21['isActor']())return 0x0;if(this['isPhysical']())return VisuMZ[_0x5164be(0x2df)][_0x5164be(0x7d0)][_0x5164be(0x235)][_0x5164be(0x80f)]&&_0xb00a21[_0x5164be(0x896)]()?_0xb00a21[_0x5164be(0x8fc)]-0.05:_0xb00a21[_0x5164be(0x8fc)];else return this[_0x5164be(0x916)]()?_0xb00a21[_0x5164be(0x992)]:0x0;},VisuMZ[_0x4a5d62(0x2df)]['Game_Action_updateLastTarget']=Game_Action[_0x4a5d62(0x5da)][_0x4a5d62(0x4ad)],Game_Action['prototype'][_0x4a5d62(0x4ad)]=function(_0x33cd59){const _0x19e19d=_0x4a5d62;VisuMZ[_0x19e19d(0x2df)][_0x19e19d(0x4d2)]['call'](this,_0x33cd59);if(VisuMZ[_0x19e19d(0x2df)][_0x19e19d(0x7d0)][_0x19e19d(0x235)][_0x19e19d(0x571)])return;const _0x47f606=_0x33cd59[_0x19e19d(0x36d)]();_0x47f606[_0x19e19d(0x22a)]&&(0x1-this[_0x19e19d(0x4ca)](_0x33cd59)>this[_0x19e19d(0x265)](_0x33cd59)&&(_0x47f606[_0x19e19d(0x22a)]=![],_0x47f606[_0x19e19d(0x3ac)]=!![]));},VisuMZ['CoreEngine'][_0x4a5d62(0x965)]=Game_BattlerBase['prototype']['initMembers'],Game_BattlerBase[_0x4a5d62(0x5da)]['initMembers']=function(){const _0x284fd5=_0x4a5d62;this[_0x284fd5(0x310)]={},VisuMZ[_0x284fd5(0x2df)][_0x284fd5(0x965)]['call'](this);},VisuMZ[_0x4a5d62(0x2df)]['Game_BattlerBase_refresh']=Game_BattlerBase['prototype'][_0x4a5d62(0x278)],Game_BattlerBase[_0x4a5d62(0x5da)]['refresh']=function(){const _0x36c5fc=_0x4a5d62;this[_0x36c5fc(0x310)]={},VisuMZ['CoreEngine'][_0x36c5fc(0x4ea)][_0x36c5fc(0x35f)](this);},Game_BattlerBase['prototype'][_0x4a5d62(0x371)]=function(_0x57fbce){const _0x50a19e=_0x4a5d62;return this[_0x50a19e(0x310)]=this[_0x50a19e(0x310)]||{},this[_0x50a19e(0x310)][_0x57fbce]!==undefined;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x7d7)]=function(_0x416c4b){const _0x5a9ed8=_0x4a5d62;return _0x416c4b=_0x416c4b||'',_0x416c4b='\x20'+_0x416c4b,(VisuMZ[_0x5a9ed8(0x2df)][_0x5a9ed8(0x7d0)]['Param'][_0x5a9ed8(0x334)]??!![])&&(_0x416c4b=_0x416c4b[_0x5a9ed8(0x805)](/\s(?:USER|THIS)\.mhp\b/gi,_0x5a9ed8(0x8de)),_0x416c4b=_0x416c4b['replace'](/\s(?:USER|THIS)\.mmp\b/gi,_0x5a9ed8(0x688)),_0x416c4b=_0x416c4b[_0x5a9ed8(0x805)](/\s(?:USER|THIS)\.atk\b/gi,'this.paramBase(2)'),_0x416c4b=_0x416c4b[_0x5a9ed8(0x805)](/\s(?:USER|THIS)\.def\b/gi,_0x5a9ed8(0x1b0)),_0x416c4b=_0x416c4b[_0x5a9ed8(0x805)](/\s(?:USER|THIS)\.mat\b/gi,_0x5a9ed8(0x7ab)),_0x416c4b=_0x416c4b[_0x5a9ed8(0x805)](/\s(?:USER|THIS)\.mdf\b/gi,_0x5a9ed8(0x8c8)),_0x416c4b=_0x416c4b[_0x5a9ed8(0x805)](/\s(?:USER|THIS)\.agi\b/gi,_0x5a9ed8(0x853)),_0x416c4b=_0x416c4b['replace'](/\s(?:USER|THIS)\.luk\b/gi,_0x5a9ed8(0x850)),_0x416c4b=_0x416c4b[_0x5a9ed8(0x805)](/\s(?:USER|THIS)\.param\(/gi,'this.paramBase(')),_0x416c4b=_0x416c4b['replace'](/\suser\./gi,_0x5a9ed8(0x309)),_0x416c4b;},Game_BattlerBase[_0x4a5d62(0x5da)][_0x4a5d62(0x1d0)]=function(_0x31d8c0){const _0x1efcfa=_0x4a5d62,_0x171bc1=(_0x174dd9,_0x14f990)=>{const _0x52b216=_0x1f9c;if(!_0x14f990)return _0x174dd9;if(_0x14f990['note'][_0x52b216(0x245)](VisuMZ[_0x52b216(0x2df)][_0x52b216(0x6c9)][_0x52b216(0x1d0)][_0x31d8c0])){var _0x1ec39b=Number(RegExp['$1']);_0x174dd9+=_0x1ec39b;}if(_0x14f990[_0x52b216(0x6c6)][_0x52b216(0x245)](VisuMZ[_0x52b216(0x2df)][_0x52b216(0x6c9)][_0x52b216(0x1cc)][_0x31d8c0])){var _0x724ecb=String(RegExp['$1']);_0x724ecb=VisuMZ['CoreEngine'][_0x52b216(0x7d7)](_0x724ecb);try{_0x174dd9+=eval(_0x724ecb);}catch(_0x22a511){if($gameTemp[_0x52b216(0x84c)]())console[_0x52b216(0x5f5)](_0x22a511);}}return _0x174dd9;};return this[_0x1efcfa(0x529)]()[_0x1efcfa(0x1b8)](_0x171bc1,this[_0x1efcfa(0x5d5)][_0x31d8c0]);},Game_BattlerBase[_0x4a5d62(0x5da)][_0x4a5d62(0x44d)]=function(_0x5371f6){const _0x3984b4=_0x4a5d62;var _0x3530b6=_0x3984b4(0x1a5)+(this[_0x3984b4(0x958)]()?'Actor':_0x3984b4(0x2c3))+_0x3984b4(0x92c)+_0x5371f6;if(this[_0x3984b4(0x371)](_0x3530b6))return this[_0x3984b4(0x310)][_0x3530b6];this[_0x3984b4(0x310)][_0x3530b6]=eval(VisuMZ['CoreEngine'][_0x3984b4(0x7d0)][_0x3984b4(0x6ea)][_0x3530b6]);const _0x3f79d0=(_0x520c43,_0x310284)=>{const _0x4cbfe4=_0x3984b4;if(!_0x310284)return _0x520c43;if(_0x310284[_0x4cbfe4(0x6c6)][_0x4cbfe4(0x245)](VisuMZ[_0x4cbfe4(0x2df)][_0x4cbfe4(0x6c9)][_0x4cbfe4(0x44d)][_0x5371f6])){var _0x3f8e4a=Number(RegExp['$1']);if(_0x3f8e4a===0x0)_0x3f8e4a=Number['MAX_SAFE_INTEGER'];_0x520c43=Math[_0x4cbfe4(0x4ef)](_0x520c43,_0x3f8e4a);}if(_0x310284[_0x4cbfe4(0x6c6)][_0x4cbfe4(0x245)](VisuMZ[_0x4cbfe4(0x2df)][_0x4cbfe4(0x6c9)][_0x4cbfe4(0x6fd)][_0x5371f6])){var _0x3961aa=String(RegExp['$1']);_0x3961aa=VisuMZ[_0x4cbfe4(0x2df)][_0x4cbfe4(0x7d7)](_0x3961aa);try{_0x520c43=Math[_0x4cbfe4(0x4ef)](_0x520c43,Number(eval(_0x3961aa)));}catch(_0x5c8617){if($gameTemp[_0x4cbfe4(0x84c)]())console['log'](_0x5c8617);}}return _0x520c43;};if(this[_0x3984b4(0x310)][_0x3530b6]===0x0)this[_0x3984b4(0x310)][_0x3530b6]=Number[_0x3984b4(0x974)];return this[_0x3984b4(0x310)][_0x3530b6]=this['traitObjects']()['reduce'](_0x3f79d0,this[_0x3984b4(0x310)][_0x3530b6]),this[_0x3984b4(0x310)][_0x3530b6];},Game_BattlerBase[_0x4a5d62(0x5da)][_0x4a5d62(0x337)]=function(_0x37c245){const _0x4e3f26=_0x4a5d62,_0x13063f=this[_0x4e3f26(0x5cb)](Game_BattlerBase[_0x4e3f26(0x444)],_0x37c245),_0x5d232c=(_0x131e75,_0x4cdb9c)=>{const _0x2537c1=_0x4e3f26;if(!_0x4cdb9c)return _0x131e75;if(_0x4cdb9c[_0x2537c1(0x6c6)][_0x2537c1(0x245)](VisuMZ[_0x2537c1(0x2df)]['RegExp'][_0x2537c1(0x2bd)][_0x37c245])){var _0x16d661=Number(RegExp['$1'])/0x64;_0x131e75*=_0x16d661;}if(_0x4cdb9c[_0x2537c1(0x6c6)][_0x2537c1(0x245)](VisuMZ['CoreEngine'][_0x2537c1(0x6c9)][_0x2537c1(0x450)][_0x37c245])){var _0x16d661=Number(RegExp['$1']);_0x131e75*=_0x16d661;}if(_0x4cdb9c[_0x2537c1(0x6c6)][_0x2537c1(0x245)](VisuMZ[_0x2537c1(0x2df)]['RegExp'][_0x2537c1(0x1bd)][_0x37c245])){var _0x781ce2=String(RegExp['$1']);_0x781ce2=VisuMZ[_0x2537c1(0x2df)][_0x2537c1(0x7d7)](_0x781ce2);try{_0x131e75*=eval(_0x781ce2);}catch(_0x3fe74a){if($gameTemp['isPlaytest']())console['log'](_0x3fe74a);}}return _0x131e75;};return this[_0x4e3f26(0x529)]()['reduce'](_0x5d232c,_0x13063f);},Game_BattlerBase[_0x4a5d62(0x5da)]['paramFlatBonus']=function(_0x58a5a3){const _0x6b85f3=_0x4a5d62,_0x1fb93f=(_0x5a08b6,_0x1de21c)=>{const _0x3077e5=_0x1f9c;if(!_0x1de21c)return _0x5a08b6;if(_0x1de21c['note'][_0x3077e5(0x245)](VisuMZ[_0x3077e5(0x2df)]['RegExp'][_0x3077e5(0x81f)][_0x58a5a3])){var _0x1e8231=Number(RegExp['$1']);_0x5a08b6+=_0x1e8231;}if(_0x1de21c['note'][_0x3077e5(0x245)](VisuMZ['CoreEngine']['RegExp'][_0x3077e5(0x19f)][_0x58a5a3])){var _0x31a085=String(RegExp['$1']);_0x31a085=VisuMZ['CoreEngine']['JsReplaceUserVar'](_0x31a085);try{_0x5a08b6+=eval(_0x31a085);}catch(_0x2f3740){if($gameTemp[_0x3077e5(0x84c)]())console[_0x3077e5(0x5f5)](_0x2f3740);}}return _0x5a08b6;};return this[_0x6b85f3(0x529)]()[_0x6b85f3(0x1b8)](_0x1fb93f,0x0);},Game_BattlerBase[_0x4a5d62(0x5da)][_0x4a5d62(0x656)]=function(_0xd1a36e){const _0x145d38=_0x4a5d62;let _0x2b78a8=_0x145d38(0x656)+_0xd1a36e+_0x145d38(0x599);if(this[_0x145d38(0x371)](_0x2b78a8))return this[_0x145d38(0x310)][_0x2b78a8];return this[_0x145d38(0x310)][_0x2b78a8]=Math['round'](VisuMZ['CoreEngine'][_0x145d38(0x7d0)][_0x145d38(0x6ea)][_0x145d38(0x1d2)][_0x145d38(0x35f)](this,_0xd1a36e)),this[_0x145d38(0x310)][_0x2b78a8];},Game_BattlerBase['prototype'][_0x4a5d62(0x944)]=function(_0x15874b){const _0x23473b=_0x4a5d62,_0x1eb5dd=(_0x9a83fd,_0x17f979)=>{const _0x142835=_0x1f9c;if(!_0x17f979)return _0x9a83fd;if(_0x17f979[_0x142835(0x6c6)][_0x142835(0x245)](VisuMZ[_0x142835(0x2df)][_0x142835(0x6c9)][_0x142835(0x82f)][_0x15874b])){var _0x12aab3=Number(RegExp['$1'])/0x64;_0x9a83fd+=_0x12aab3;}if(_0x17f979[_0x142835(0x6c6)][_0x142835(0x245)](VisuMZ[_0x142835(0x2df)][_0x142835(0x6c9)][_0x142835(0x689)][_0x15874b])){var _0x12aab3=Number(RegExp['$1']);_0x9a83fd+=_0x12aab3;}if(_0x17f979[_0x142835(0x6c6)][_0x142835(0x245)](VisuMZ[_0x142835(0x2df)]['RegExp'][_0x142835(0x3df)][_0x15874b])){var _0x47782f=String(RegExp['$1']);_0x47782f=VisuMZ[_0x142835(0x2df)][_0x142835(0x7d7)](_0x47782f);try{_0x9a83fd+=eval(_0x47782f);}catch(_0x27dd54){if($gameTemp[_0x142835(0x84c)]())console['log'](_0x27dd54);}}return _0x9a83fd;};return this['traitObjects']()[_0x23473b(0x1b8)](_0x1eb5dd,0x0);},Game_BattlerBase[_0x4a5d62(0x5da)][_0x4a5d62(0x7a7)]=function(_0x5bb707){const _0x5c1b1a=_0x4a5d62,_0x566911=(_0xd77c25,_0x54c9bd)=>{const _0x3a1146=_0x1f9c;if(!_0x54c9bd)return _0xd77c25;if(_0x54c9bd[_0x3a1146(0x6c6)]['match'](VisuMZ[_0x3a1146(0x2df)][_0x3a1146(0x6c9)][_0x3a1146(0x6fc)][_0x5bb707])){var _0x1383c6=Number(RegExp['$1'])/0x64;_0xd77c25*=_0x1383c6;}if(_0x54c9bd[_0x3a1146(0x6c6)][_0x3a1146(0x245)](VisuMZ[_0x3a1146(0x2df)][_0x3a1146(0x6c9)][_0x3a1146(0x227)][_0x5bb707])){var _0x1383c6=Number(RegExp['$1']);_0xd77c25*=_0x1383c6;}if(_0x54c9bd[_0x3a1146(0x6c6)][_0x3a1146(0x245)](VisuMZ[_0x3a1146(0x2df)][_0x3a1146(0x6c9)]['xparamRateJS'][_0x5bb707])){var _0x5b8c78=String(RegExp['$1']);_0x5b8c78=VisuMZ[_0x3a1146(0x2df)][_0x3a1146(0x7d7)](_0x5b8c78);try{_0xd77c25*=eval(_0x5b8c78);}catch(_0x89d69){if($gameTemp[_0x3a1146(0x84c)]())console['log'](_0x89d69);}}return _0xd77c25;};return this[_0x5c1b1a(0x529)]()['reduce'](_0x566911,0x1);},Game_BattlerBase[_0x4a5d62(0x5da)][_0x4a5d62(0x7c9)]=function(_0xb4dfbd){const _0x5c3860=_0x4a5d62,_0x2826e7=(_0x1a9c13,_0x387e65)=>{const _0x29972f=_0x1f9c;if(!_0x387e65)return _0x1a9c13;if(_0x387e65[_0x29972f(0x6c6)]['match'](VisuMZ['CoreEngine'][_0x29972f(0x6c9)]['xparamFlat1'][_0xb4dfbd])){var _0x51e252=Number(RegExp['$1'])/0x64;_0x1a9c13+=_0x51e252;}if(_0x387e65[_0x29972f(0x6c6)][_0x29972f(0x245)](VisuMZ[_0x29972f(0x2df)][_0x29972f(0x6c9)]['xparamFlat2'][_0xb4dfbd])){var _0x51e252=Number(RegExp['$1']);_0x1a9c13+=_0x51e252;}if(_0x387e65[_0x29972f(0x6c6)]['match'](VisuMZ[_0x29972f(0x2df)][_0x29972f(0x6c9)]['xparamFlatJS'][_0xb4dfbd])){var _0x113e1a=String(RegExp['$1']);_0x113e1a=VisuMZ['CoreEngine']['JsReplaceUserVar'](_0x113e1a);try{_0x1a9c13+=eval(_0x113e1a);}catch(_0xf60fb1){if($gameTemp['isPlaytest']())console['log'](_0xf60fb1);}}return _0x1a9c13;};return this['traitObjects']()[_0x5c3860(0x1b8)](_0x2826e7,0x0);},Game_BattlerBase['prototype']['xparam']=function(_0x4c9439){const _0x267a9f=_0x4a5d62;let _0x57e35a=_0x267a9f(0x697)+_0x4c9439+_0x267a9f(0x599);if(this[_0x267a9f(0x371)](_0x57e35a))return this[_0x267a9f(0x310)][_0x57e35a];return this[_0x267a9f(0x310)][_0x57e35a]=VisuMZ[_0x267a9f(0x2df)]['Settings'][_0x267a9f(0x6ea)][_0x267a9f(0x2fb)]['call'](this,_0x4c9439),this[_0x267a9f(0x310)][_0x57e35a];},Game_BattlerBase[_0x4a5d62(0x5da)][_0x4a5d62(0x5e3)]=function(_0x4e7352){const _0x553bca=_0x4a5d62,_0x3270a0=(_0x2271c6,_0x4a6a33)=>{const _0x551ab3=_0x1f9c;if(!_0x4a6a33)return _0x2271c6;if(_0x4a6a33[_0x551ab3(0x6c6)]['match'](VisuMZ['CoreEngine'][_0x551ab3(0x6c9)][_0x551ab3(0x95f)][_0x4e7352])){var _0x261e68=Number(RegExp['$1'])/0x64;_0x2271c6+=_0x261e68;}if(_0x4a6a33[_0x551ab3(0x6c6)][_0x551ab3(0x245)](VisuMZ[_0x551ab3(0x2df)]['RegExp']['sparamPlus2'][_0x4e7352])){var _0x261e68=Number(RegExp['$1']);_0x2271c6+=_0x261e68;}if(_0x4a6a33[_0x551ab3(0x6c6)][_0x551ab3(0x245)](VisuMZ[_0x551ab3(0x2df)]['RegExp'][_0x551ab3(0x466)][_0x4e7352])){var _0x95a245=String(RegExp['$1']);_0x95a245=VisuMZ[_0x551ab3(0x2df)][_0x551ab3(0x7d7)](_0x95a245);try{_0x2271c6+=eval(_0x95a245);}catch(_0x43f076){if($gameTemp[_0x551ab3(0x84c)]())console[_0x551ab3(0x5f5)](_0x43f076);}}return _0x2271c6;};return this[_0x553bca(0x529)]()['reduce'](_0x3270a0,0x0);},Game_BattlerBase['prototype'][_0x4a5d62(0x2ce)]=function(_0xf977fb){const _0xa45fb4=_0x4a5d62,_0x17332b=(_0x440e0a,_0x44e9ee)=>{const _0x45b1bd=_0x1f9c;if(!_0x44e9ee)return _0x440e0a;if(_0x44e9ee[_0x45b1bd(0x6c6)][_0x45b1bd(0x245)](VisuMZ[_0x45b1bd(0x2df)][_0x45b1bd(0x6c9)]['sparamRate1'][_0xf977fb])){var _0x9471b4=Number(RegExp['$1'])/0x64;_0x440e0a*=_0x9471b4;}if(_0x44e9ee[_0x45b1bd(0x6c6)][_0x45b1bd(0x245)](VisuMZ[_0x45b1bd(0x2df)][_0x45b1bd(0x6c9)]['sparamRate2'][_0xf977fb])){var _0x9471b4=Number(RegExp['$1']);_0x440e0a*=_0x9471b4;}if(_0x44e9ee[_0x45b1bd(0x6c6)][_0x45b1bd(0x245)](VisuMZ[_0x45b1bd(0x2df)][_0x45b1bd(0x6c9)][_0x45b1bd(0x3b2)][_0xf977fb])){var _0x1e19bc=String(RegExp['$1']);_0x1e19bc=VisuMZ[_0x45b1bd(0x2df)][_0x45b1bd(0x7d7)](_0x1e19bc);try{_0x440e0a*=eval(_0x1e19bc);}catch(_0x5367d1){if($gameTemp[_0x45b1bd(0x84c)]())console[_0x45b1bd(0x5f5)](_0x5367d1);}}return _0x440e0a;};return this[_0xa45fb4(0x529)]()[_0xa45fb4(0x1b8)](_0x17332b,0x1);},Game_BattlerBase[_0x4a5d62(0x5da)][_0x4a5d62(0x42e)]=function(_0x576af0){const _0x2591a6=_0x4a5d62,_0x330156=(_0x59a397,_0x144034)=>{const _0x5480b4=_0x1f9c;if(!_0x144034)return _0x59a397;if(_0x144034[_0x5480b4(0x6c6)][_0x5480b4(0x245)](VisuMZ[_0x5480b4(0x2df)][_0x5480b4(0x6c9)]['sparamFlat1'][_0x576af0])){var _0x44c1fc=Number(RegExp['$1'])/0x64;_0x59a397+=_0x44c1fc;}if(_0x144034[_0x5480b4(0x6c6)]['match'](VisuMZ['CoreEngine']['RegExp'][_0x5480b4(0x5e0)][_0x576af0])){var _0x44c1fc=Number(RegExp['$1']);_0x59a397+=_0x44c1fc;}if(_0x144034[_0x5480b4(0x6c6)]['match'](VisuMZ[_0x5480b4(0x2df)]['RegExp']['sparamFlatJS'][_0x576af0])){var _0x1f5132=String(RegExp['$1']);_0x1f5132=VisuMZ[_0x5480b4(0x2df)][_0x5480b4(0x7d7)](_0x1f5132);try{_0x59a397+=eval(_0x1f5132);}catch(_0x5d38da){if($gameTemp[_0x5480b4(0x84c)]())console[_0x5480b4(0x5f5)](_0x5d38da);}}return _0x59a397;};return this[_0x2591a6(0x529)]()[_0x2591a6(0x1b8)](_0x330156,0x0);},Game_BattlerBase[_0x4a5d62(0x5da)][_0x4a5d62(0x932)]=function(_0x3dfa2b){const _0x3903b4=_0x4a5d62;let _0x2eabc2=_0x3903b4(0x932)+_0x3dfa2b+'Total';if(this[_0x3903b4(0x371)](_0x2eabc2))return this[_0x3903b4(0x310)][_0x2eabc2];return this[_0x3903b4(0x310)][_0x2eabc2]=VisuMZ['CoreEngine']['Settings'][_0x3903b4(0x6ea)][_0x3903b4(0x528)][_0x3903b4(0x35f)](this,_0x3dfa2b),this['_cache'][_0x2eabc2];},Game_BattlerBase[_0x4a5d62(0x5da)][_0x4a5d62(0x93b)]=function(_0x16cb03,_0x2a46e8){const _0xa785bf=_0x4a5d62;if(typeof paramId==='number')return this[_0xa785bf(0x656)](_0x16cb03);_0x16cb03=String(_0x16cb03||'')[_0xa785bf(0x8be)]();if(_0x16cb03===_0xa785bf(0x200))return this[_0xa785bf(0x656)](0x0);if(_0x16cb03===_0xa785bf(0x48d))return this[_0xa785bf(0x656)](0x1);if(_0x16cb03==='ATK')return this[_0xa785bf(0x656)](0x2);if(_0x16cb03===_0xa785bf(0x952))return this['param'](0x3);if(_0x16cb03==='MAT')return this[_0xa785bf(0x656)](0x4);if(_0x16cb03===_0xa785bf(0x953))return this[_0xa785bf(0x656)](0x5);if(_0x16cb03===_0xa785bf(0x4f0))return this[_0xa785bf(0x656)](0x6);if(_0x16cb03===_0xa785bf(0x790))return this[_0xa785bf(0x656)](0x7);if(_0x16cb03===_0xa785bf(0x46b))return _0x2a46e8?String(Math[_0xa785bf(0x372)](this[_0xa785bf(0x697)](0x0)*0x64))+'%':this[_0xa785bf(0x697)](0x0);if(_0x16cb03===_0xa785bf(0x6b1))return _0x2a46e8?String(Math[_0xa785bf(0x372)](this[_0xa785bf(0x697)](0x1)*0x64))+'%':this[_0xa785bf(0x697)](0x1);if(_0x16cb03===_0xa785bf(0x84d))return _0x2a46e8?String(Math[_0xa785bf(0x372)](this[_0xa785bf(0x697)](0x2)*0x64))+'%':this[_0xa785bf(0x697)](0x2);if(_0x16cb03===_0xa785bf(0x6ee))return _0x2a46e8?String(Math[_0xa785bf(0x372)](this[_0xa785bf(0x697)](0x3)*0x64))+'%':this[_0xa785bf(0x697)](0x3);if(_0x16cb03===_0xa785bf(0x816))return _0x2a46e8?String(Math[_0xa785bf(0x372)](this['xparam'](0x4)*0x64))+'%':this[_0xa785bf(0x697)](0x4);if(_0x16cb03===_0xa785bf(0x5b2))return _0x2a46e8?String(Math[_0xa785bf(0x372)](this[_0xa785bf(0x697)](0x5)*0x64))+'%':this[_0xa785bf(0x697)](0x5);if(_0x16cb03==='CNT')return _0x2a46e8?String(Math[_0xa785bf(0x372)](this[_0xa785bf(0x697)](0x6)*0x64))+'%':this[_0xa785bf(0x697)](0x6);if(_0x16cb03==='HRG')return _0x2a46e8?String(Math[_0xa785bf(0x372)](this[_0xa785bf(0x697)](0x7)*0x64))+'%':this[_0xa785bf(0x697)](0x7);if(_0x16cb03===_0xa785bf(0x558))return _0x2a46e8?String(Math['round'](this['xparam'](0x8)*0x64))+'%':this[_0xa785bf(0x697)](0x8);if(_0x16cb03===_0xa785bf(0x849))return _0x2a46e8?String(Math[_0xa785bf(0x372)](this[_0xa785bf(0x697)](0x9)*0x64))+'%':this[_0xa785bf(0x697)](0x9);if(_0x16cb03===_0xa785bf(0x71d))return _0x2a46e8?String(Math['round'](this['sparam'](0x0)*0x64))+'%':this[_0xa785bf(0x932)](0x0);if(_0x16cb03===_0xa785bf(0x2dd))return _0x2a46e8?String(Math[_0xa785bf(0x372)](this[_0xa785bf(0x932)](0x1)*0x64))+'%':this[_0xa785bf(0x932)](0x1);if(_0x16cb03==='REC')return _0x2a46e8?String(Math[_0xa785bf(0x372)](this[_0xa785bf(0x932)](0x2)*0x64))+'%':this['sparam'](0x2);if(_0x16cb03===_0xa785bf(0x4d5))return _0x2a46e8?String(Math['round'](this[_0xa785bf(0x932)](0x3)*0x64))+'%':this['sparam'](0x3);if(_0x16cb03==='MCR')return _0x2a46e8?String(Math[_0xa785bf(0x372)](this[_0xa785bf(0x932)](0x4)*0x64))+'%':this[_0xa785bf(0x932)](0x4);if(_0x16cb03===_0xa785bf(0x3da))return _0x2a46e8?String(Math[_0xa785bf(0x372)](this[_0xa785bf(0x932)](0x5)*0x64))+'%':this['sparam'](0x5);if(_0x16cb03===_0xa785bf(0x5b6))return _0x2a46e8?String(Math[_0xa785bf(0x372)](this[_0xa785bf(0x932)](0x6)*0x64))+'%':this[_0xa785bf(0x932)](0x6);if(_0x16cb03===_0xa785bf(0x7cb))return _0x2a46e8?String(Math[_0xa785bf(0x372)](this[_0xa785bf(0x932)](0x7)*0x64))+'%':this[_0xa785bf(0x932)](0x7);if(_0x16cb03===_0xa785bf(0x909))return _0x2a46e8?String(Math['round'](this[_0xa785bf(0x932)](0x8)*0x64))+'%':this[_0xa785bf(0x932)](0x8);if(_0x16cb03===_0xa785bf(0x222))return _0x2a46e8?String(Math[_0xa785bf(0x372)](this[_0xa785bf(0x932)](0x9)*0x64))+'%':this[_0xa785bf(0x932)](0x9);if(VisuMZ[_0xa785bf(0x2df)][_0xa785bf(0x26e)][_0x16cb03]){const _0x1c9a95=VisuMZ['CoreEngine']['CustomParamAbb'][_0x16cb03],_0x22e7d3=this[_0x1c9a95];return VisuMZ[_0xa785bf(0x2df)][_0xa785bf(0x878)][_0x16cb03]===_0xa785bf(0x60b)?_0x22e7d3:_0x2a46e8?String(Math[_0xa785bf(0x372)](_0x22e7d3*0x64))+'%':_0x22e7d3;}return'';},Game_BattlerBase[_0x4a5d62(0x5da)][_0x4a5d62(0x43e)]=function(){const _0x204743=_0x4a5d62;return this[_0x204743(0x321)]()&&this['_hp']<this[_0x204743(0x27d)]*VisuMZ[_0x204743(0x2df)]['Settings'][_0x204743(0x6ea)][_0x204743(0x48e)];},Game_Battler[_0x4a5d62(0x5da)][_0x4a5d62(0x1c3)]=function(){const _0x570c08=_0x4a5d62;SoundManager['playMiss'](),this[_0x570c08(0x7b9)]('evade');},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x942)]=Game_Actor[_0x4a5d62(0x5da)][_0x4a5d62(0x203)],Game_Actor['prototype'][_0x4a5d62(0x203)]=function(_0x1835ea){const _0x27c3a5=_0x4a5d62;if(this[_0x27c3a5(0x416)]>0x63)return this[_0x27c3a5(0x6ac)](_0x1835ea);return VisuMZ[_0x27c3a5(0x2df)]['Game_Actor_paramBase'][_0x27c3a5(0x35f)](this,_0x1835ea);},Game_Actor[_0x4a5d62(0x5da)][_0x4a5d62(0x6ac)]=function(_0x303987){const _0x152faa=_0x4a5d62,_0x22b4f9=this[_0x152faa(0x4f4)]()[_0x152faa(0x9a1)][_0x303987][0x63],_0x30cec5=this[_0x152faa(0x4f4)]()[_0x152faa(0x9a1)][_0x303987][0x62];return _0x22b4f9+(_0x22b4f9-_0x30cec5)*(this[_0x152faa(0x416)]-0x63);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x935)]=Game_Actor[_0x4a5d62(0x5da)][_0x4a5d62(0x50a)],Game_Actor[_0x4a5d62(0x5da)][_0x4a5d62(0x50a)]=function(_0x3fae39,_0x591b92){const _0x4b5e59=_0x4a5d62;$gameTemp[_0x4b5e59(0x43b)]=!![],VisuMZ[_0x4b5e59(0x2df)][_0x4b5e59(0x935)][_0x4b5e59(0x35f)](this,_0x3fae39,_0x591b92),$gameTemp[_0x4b5e59(0x43b)]=undefined;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x97e)]=Game_Actor[_0x4a5d62(0x5da)]['levelUp'],Game_Actor[_0x4a5d62(0x5da)][_0x4a5d62(0x586)]=function(){const _0x1f03bb=_0x4a5d62;VisuMZ[_0x1f03bb(0x2df)][_0x1f03bb(0x97e)]['call'](this);if(!$gameTemp['_changingClass'])this[_0x1f03bb(0x60e)]();},Game_Actor['prototype']['levelUpRecovery']=function(){const _0x87a991=_0x4a5d62;this['_cache']={};if(VisuMZ[_0x87a991(0x2df)][_0x87a991(0x7d0)]['QoL'][_0x87a991(0x768)])this[_0x87a991(0x7d8)]=this['mhp'];if(VisuMZ['CoreEngine'][_0x87a991(0x7d0)]['QoL'][_0x87a991(0x99e)])this[_0x87a991(0x6b5)]=this['mmp'];},Game_Actor['prototype'][_0x4a5d62(0x6a7)]=function(){const _0x28aa48=_0x4a5d62;if(this['isMaxLevel']())return 0x1;const _0x572df3=this[_0x28aa48(0x420)]()-this[_0x28aa48(0x64b)](),_0x5ecb5a=this['currentExp']()-this['currentLevelExp']();return(_0x5ecb5a/_0x572df3)['clamp'](0x0,0x1);},Game_Actor[_0x4a5d62(0x5da)][_0x4a5d62(0x529)]=function(){const _0x3bdb75=_0x4a5d62,_0x5dc5f8=Game_Battler[_0x3bdb75(0x5da)][_0x3bdb75(0x529)][_0x3bdb75(0x35f)](this);for(const _0x409a6f of this[_0x3bdb75(0x268)]()){_0x409a6f&&_0x5dc5f8[_0x3bdb75(0x98c)](_0x409a6f);}return _0x5dc5f8['push'](this[_0x3bdb75(0x4f4)](),this[_0x3bdb75(0x3ea)]()),_0x5dc5f8;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x519)]=Game_Actor[_0x4a5d62(0x5da)][_0x4a5d62(0x368)],Game_Actor[_0x4a5d62(0x5da)][_0x4a5d62(0x368)]=function(){const _0x789389=_0x4a5d62;if(!$gameParty['inBattle']())return!![];return VisuMZ[_0x789389(0x2df)][_0x789389(0x519)][_0x789389(0x35f)](this);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x467)]=Game_Unit[_0x4a5d62(0x5da)][_0x4a5d62(0x4d9)],Game_Unit[_0x4a5d62(0x5da)][_0x4a5d62(0x4d9)]=function(_0x46a119){const _0x20f168=_0x4a5d62;this[_0x20f168(0x1e2)]=!![],VisuMZ[_0x20f168(0x2df)][_0x20f168(0x467)][_0x20f168(0x35f)](this,_0x46a119);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x6d6)]=Game_Unit[_0x4a5d62(0x5da)][_0x4a5d62(0x99a)],Game_Unit[_0x4a5d62(0x5da)][_0x4a5d62(0x99a)]=function(){const _0x13ae40=_0x4a5d62;for(const _0x3bf5ea of this[_0x13ae40(0x7b1)]()){_0x3bf5ea&&!_0x3bf5ea[_0x13ae40(0x368)]()&&_0x3bf5ea[_0x13ae40(0x758)]();}VisuMZ['CoreEngine'][_0x13ae40(0x6d6)][_0x13ae40(0x35f)](this);},Object[_0x4a5d62(0x67c)](Game_Enemy[_0x4a5d62(0x5da)],_0x4a5d62(0x416),{'get':function(){const _0x674d5b=_0x4a5d62;return this[_0x674d5b(0x55d)]();},'configurable':!![]}),Game_Enemy[_0x4a5d62(0x5da)][_0x4a5d62(0x55d)]=function(){const _0x15fab3=_0x4a5d62;return this[_0x15fab3(0x845)]()[_0x15fab3(0x416)];},Game_Enemy[_0x4a5d62(0x5da)][_0x4a5d62(0x2e7)]=function(){const _0x562fb0=_0x4a5d62;!this['_repositioned']&&(this[_0x562fb0(0x7e2)]+=Math[_0x562fb0(0x372)]((Graphics[_0x562fb0(0x592)]-0x270)/0x2),this[_0x562fb0(0x7e2)]-=Math['floor']((Graphics[_0x562fb0(0x592)]-Graphics[_0x562fb0(0x433)])/0x2),$gameSystem['isSideView']()?this[_0x562fb0(0x648)]-=Math[_0x562fb0(0x734)]((Graphics[_0x562fb0(0x6e0)]-Graphics['boxWidth'])/0x2):this[_0x562fb0(0x648)]+=Math[_0x562fb0(0x372)]((Graphics['boxWidth']-0x330)/0x2)),this[_0x562fb0(0x881)]=!![];},Game_Party['prototype']['maxGold']=function(){const _0x113c5f=_0x4a5d62;return VisuMZ[_0x113c5f(0x2df)][_0x113c5f(0x7d0)][_0x113c5f(0x66a)]['GoldMax'];},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x23d)]=Game_Party[_0x4a5d62(0x5da)][_0x4a5d62(0x2c7)],Game_Party['prototype'][_0x4a5d62(0x2c7)]=function(_0x2e7d33){const _0x4c0257=_0x4a5d62;if(VisuMZ[_0x4c0257(0x2df)][_0x4c0257(0x7d0)][_0x4c0257(0x235)][_0x4c0257(0x35c)]&&DataManager[_0x4c0257(0x1a0)](_0x2e7d33))return;VisuMZ[_0x4c0257(0x2df)][_0x4c0257(0x23d)][_0x4c0257(0x35f)](this,_0x2e7d33);},Game_Party['prototype'][_0x4a5d62(0x819)]=function(){const _0x332858=_0x4a5d62,_0x4f8cf7=VisuMZ[_0x332858(0x2df)][_0x332858(0x7d0)][_0x332858(0x235)],_0x5c6a8f=_0x4f8cf7[_0x332858(0x356)]??0x63;let _0x5aa564=[];(_0x4f8cf7[_0x332858(0x407)]??!![])&&(_0x5aa564=_0x5aa564[_0x332858(0x848)]($dataItems));(_0x4f8cf7[_0x332858(0x38d)]??!![])&&(_0x5aa564=_0x5aa564[_0x332858(0x848)]($dataWeapons));(_0x4f8cf7[_0x332858(0x872)]??!![])&&(_0x5aa564=_0x5aa564[_0x332858(0x848)]($dataArmors));for(const _0x26aef4 of _0x5aa564){if(!_0x26aef4)continue;if(_0x26aef4[_0x332858(0x79f)][_0x332858(0x5d4)]()<=0x0)continue;if(_0x26aef4[_0x332858(0x79f)][_0x332858(0x245)](/-----/i))continue;this['gainItem'](_0x26aef4,_0x5c6a8f);}},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x5a0)]=Game_Troop[_0x4a5d62(0x5da)][_0x4a5d62(0x684)],Game_Troop[_0x4a5d62(0x5da)][_0x4a5d62(0x684)]=function(_0x555977){const _0x5d3fd5=_0x4a5d62;$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),$gameTemp[_0x5d3fd5(0x315)](_0x555977),VisuMZ[_0x5d3fd5(0x2df)][_0x5d3fd5(0x5a0)]['call'](this,_0x555977);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x745)]=Game_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x684)],Game_Map[_0x4a5d62(0x5da)]['setup']=function(_0x735d3c){const _0x27c68e=_0x4a5d62;VisuMZ[_0x27c68e(0x2df)][_0x27c68e(0x745)]['call'](this,_0x735d3c),this[_0x27c68e(0x21a)](),this[_0x27c68e(0x597)](_0x735d3c),this[_0x27c68e(0x244)]();},Game_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x597)]=function(){const _0x2cb376=_0x4a5d62;this[_0x2cb376(0x590)]=VisuMZ[_0x2cb376(0x2df)][_0x2cb376(0x7d0)][_0x2cb376(0x235)]['NoTileShadows']||![];const _0x25e521=VisuMZ[_0x2cb376(0x2df)]['Settings'][_0x2cb376(0x210)],_0x149ceb=$dataMap?$dataMap[_0x2cb376(0x6c6)]||'':'';if(_0x149ceb[_0x2cb376(0x245)](/<SHOW TILE SHADOWS>/i))this[_0x2cb376(0x590)]=![];else _0x149ceb[_0x2cb376(0x245)](/<HIDE TILE SHADOWS>/i)&&(this[_0x2cb376(0x590)]=!![]);if(_0x149ceb['match'](/<SCROLL LOCK X>/i))this[_0x2cb376(0x8ea)]()[_0x2cb376(0x690)]=!![],this[_0x2cb376(0x8ea)]()[_0x2cb376(0x729)]=_0x25e521['DisplayLockX'];else _0x149ceb[_0x2cb376(0x245)](/<SCROLL LOCK X: (.*?)>/i)&&(this['centerCameraCheckData']()[_0x2cb376(0x690)]=!![],this['centerCameraCheckData']()[_0x2cb376(0x729)]=Number(RegExp['$1']));if(_0x149ceb[_0x2cb376(0x245)](/<SCROLL LOCK Y>/i))this[_0x2cb376(0x8ea)]()['centerY']=!![],this[_0x2cb376(0x8ea)]()['displayY']=_0x25e521[_0x2cb376(0x8f3)];else _0x149ceb[_0x2cb376(0x245)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x2cb376(0x8ea)]()[_0x2cb376(0x8cb)]=!![],this[_0x2cb376(0x8ea)]()[_0x2cb376(0x560)]=Number(RegExp['$1']));},Game_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x906)]=function(){const _0x36656e=_0x4a5d62;if(this[_0x36656e(0x590)]===undefined)this['setupCoreEngine']();return this['_hideTileShadows'];},Game_Map['prototype']['checkCoreEngineDisplayCenter']=function(){const _0x585c98=_0x4a5d62,_0x222610=VisuMZ[_0x585c98(0x2df)][_0x585c98(0x7d0)]['ScreenResolution'];this['_centerCameraCheck']={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x222610[_0x585c98(0x72b)]){const _0x1fbbd1=Graphics[_0x585c98(0x6e0)]/this[_0x585c98(0x381)]();_0x1fbbd1%0x1!==0x0&&Math[_0x585c98(0x783)](_0x1fbbd1)===this[_0x585c98(0x6e0)]()&&!this['isLoopHorizontal']()&&(this['_centerCameraCheck'][_0x585c98(0x690)]=!![],this[_0x585c98(0x61f)]['displayX']=_0x222610[_0x585c98(0x79d)]||0x0);}if(_0x222610['AutoScrollLockY']){const _0x468411=Graphics[_0x585c98(0x592)]/this[_0x585c98(0x2ad)]();_0x468411%0x1!==0x0&&Math[_0x585c98(0x783)](_0x468411)===this[_0x585c98(0x592)]()&&!this[_0x585c98(0x4e6)]()&&(this[_0x585c98(0x61f)]['centerY']=!![],this[_0x585c98(0x61f)][_0x585c98(0x560)]=_0x222610[_0x585c98(0x8f3)]||0x0);}$gameScreen[_0x585c98(0x1ac)]()===0x1&&(this[_0x585c98(0x8ea)]()[_0x585c98(0x690)]&&(this[_0x585c98(0x3a3)]=this[_0x585c98(0x8ea)]()[_0x585c98(0x729)]),this[_0x585c98(0x8ea)]()[_0x585c98(0x8cb)]&&(this[_0x585c98(0x5e1)]=this['centerCameraCheckData']()[_0x585c98(0x560)]));},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x412)]=Game_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x3c7)],Game_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x3c7)]=function(_0x18ca12,_0x368b63){const _0x2ea0ae=_0x4a5d62;VisuMZ[_0x2ea0ae(0x2df)][_0x2ea0ae(0x412)][_0x2ea0ae(0x35f)](this,_0x18ca12,_0x368b63),$gameScreen[_0x2ea0ae(0x1ac)]()===0x1&&(!this[_0x2ea0ae(0x69f)]()&&this[_0x2ea0ae(0x8ea)]()[_0x2ea0ae(0x690)]&&(this['_displayX']=this['centerCameraCheckData']()[_0x2ea0ae(0x729)]),!this[_0x2ea0ae(0x4e6)]()&&this[_0x2ea0ae(0x8ea)]()[_0x2ea0ae(0x8cb)]&&(this[_0x2ea0ae(0x5e1)]=this['centerCameraCheckData']()[_0x2ea0ae(0x560)]));},Game_Map['prototype'][_0x4a5d62(0x8ea)]=function(){const _0x2ff558=_0x4a5d62;if(this[_0x2ff558(0x61f)]===undefined)this[_0x2ff558(0x21a)]();return this[_0x2ff558(0x61f)];},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x339)]=Game_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x959)],Game_Map['prototype'][_0x4a5d62(0x959)]=function(_0xd7054d){const _0x215904=_0x4a5d62;if(this['centerCameraCheckData']()[_0x215904(0x8cb)]&&$gameScreen[_0x215904(0x1ac)]()===0x1){this['_displayY']=this['centerCameraCheckData']()['displayY'];return;}VisuMZ['CoreEngine'][_0x215904(0x339)][_0x215904(0x35f)](this,_0xd7054d);},VisuMZ['CoreEngine']['Game_Map_scrollLeft']=Game_Map[_0x4a5d62(0x5da)]['scrollLeft'],Game_Map['prototype']['scrollLeft']=function(_0x4d57e3){const _0x4e11da=_0x4a5d62;if(this[_0x4e11da(0x8ea)]()[_0x4e11da(0x690)]&&$gameScreen[_0x4e11da(0x1ac)]()===0x1){this['_displayX']=this[_0x4e11da(0x8ea)]()[_0x4e11da(0x729)];return;}VisuMZ['CoreEngine']['Game_Map_scrollLeft']['call'](this,_0x4d57e3);},VisuMZ['CoreEngine'][_0x4a5d62(0x8c7)]=Game_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x58f)],Game_Map['prototype'][_0x4a5d62(0x58f)]=function(_0x2afca5){const _0x38faea=_0x4a5d62;if(this[_0x38faea(0x8ea)]()[_0x38faea(0x690)]&&$gameScreen[_0x38faea(0x1ac)]()===0x1){this[_0x38faea(0x3a3)]=this['centerCameraCheckData']()[_0x38faea(0x729)];return;}VisuMZ[_0x38faea(0x2df)][_0x38faea(0x8c7)][_0x38faea(0x35f)](this,_0x2afca5);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x7f4)]=Game_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x3e0)],Game_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x3e0)]=function(_0x45c835){const _0x3d2410=_0x4a5d62;if(this[_0x3d2410(0x8ea)]()[_0x3d2410(0x8cb)]&&$gameScreen[_0x3d2410(0x1ac)]()===0x1){this[_0x3d2410(0x5e1)]=this[_0x3d2410(0x8ea)]()[_0x3d2410(0x560)];return;}VisuMZ[_0x3d2410(0x2df)]['Game_Map_scrollUp'][_0x3d2410(0x35f)](this,_0x45c835);},Game_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x244)]=function(){const _0x60d46f=_0x4a5d62;this[_0x60d46f(0x32f)]={};const _0x16aa72=this['tileset']();if(!_0x16aa72)return{};const _0x22ecec=_0x16aa72['note']||'',_0x4c9cc1=/<(?:TALLER|EXT|EXTEND|RAISE)[ ]BY[ ](\d+):[ ](.*)>/gi;let _0x476246={};const _0x4989df=_0x22ecec[_0x60d46f(0x245)](_0x4c9cc1);if(_0x4989df)for(const _0xf880d4 of _0x4989df){_0xf880d4[_0x60d46f(0x245)](_0x4c9cc1);const _0x141025=Number(RegExp['$1'])[_0x60d46f(0x95d)](0x1,0x10),_0x18c718=String(RegExp['$2'])['split'](',')[_0x60d46f(0x714)](_0x2a3dc7=>Number(_0x2a3dc7)[_0x60d46f(0x95d)](0x1,0x7));for(const _0x480921 of _0x18c718){_0x476246[_0x480921]=_0x141025;}}this[_0x60d46f(0x32f)]=_0x476246;},Game_Map['prototype'][_0x4a5d62(0x20b)]=function(){const _0x49fba3=_0x4a5d62;if(this[_0x49fba3(0x32f)]===undefined)this['setupTileExtendTerrainTags']();return this['_tileExtendTerrainTags'];},Game_Map[_0x4a5d62(0x5da)]['isTileExtended']=function(_0x4f9475){const _0x130878=_0x4a5d62;if(_0x4f9475>=0x400)return![];const _0x53b3f5=$gameMap['getTileExtendTerrainTags']();if(Object[_0x130878(0x62a)](_0x53b3f5)[_0x130878(0x6d1)]<=0x0)return![];const _0x54cc9e=this[_0x130878(0x1ba)](),_0x471755=_0x54cc9e[_0x4f9475]>>0xc,_0x185a0=_0x53b3f5[_0x471755]||0x0;return _0x185a0>0x0;},VisuMZ['CoreEngine'][_0x4a5d62(0x873)]=Game_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x3ad)],Game_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x3ad)]=function(_0x517b5d){const _0x60e2bf=_0x4a5d62;VisuMZ[_0x60e2bf(0x2df)][_0x60e2bf(0x873)]['call'](this,_0x517b5d),this[_0x60e2bf(0x675)](),SceneManager[_0x60e2bf(0x7d2)][_0x60e2bf(0x5f4)][_0x60e2bf(0x8fa)]();},Game_Map['prototype'][_0x4a5d62(0x675)]=function(){const _0x43168f=_0x4a5d62,_0x53596b=this['getTileExtendTerrainTags']();if(Object[_0x43168f(0x62a)](_0x53596b)['length']<=0x0)return;const _0x24c2d0=SceneManager[_0x43168f(0x7d2)][_0x43168f(0x5f4)];_0x24c2d0&&(_0x24c2d0[_0x43168f(0x5ee)]&&_0x24c2d0[_0x43168f(0x5ee)](),_0x24c2d0[_0x43168f(0x5c2)]&&_0x24c2d0[_0x43168f(0x5c2)]());},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x547)]=Game_Character['prototype']['processMoveCommand'],Game_Character[_0x4a5d62(0x5da)]['processMoveCommand']=function(_0x80fb87){const _0x52e50f=_0x4a5d62;try{VisuMZ['CoreEngine'][_0x52e50f(0x547)]['call'](this,_0x80fb87);}catch(_0x436ab1){if($gameTemp[_0x52e50f(0x84c)]())console[_0x52e50f(0x5f5)](_0x436ab1);}},Game_Player[_0x4a5d62(0x5da)][_0x4a5d62(0x4e7)]=function(){const _0x53e1c3=_0x4a5d62,_0x3efde6=$gameMap[_0x53e1c3(0x446)]();this[_0x53e1c3(0x5c4)]=Math[_0x53e1c3(0x60a)](_0x3efde6)+Math[_0x53e1c3(0x60a)](_0x3efde6)+this[_0x53e1c3(0x439)]();},Game_Player[_0x4a5d62(0x5da)][_0x4a5d62(0x439)]=function(){const _0x4babd7=_0x4a5d62;return $dataMap&&$dataMap[_0x4babd7(0x6c6)]&&$dataMap['note']['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x4babd7(0x2df)][_0x4babd7(0x7d0)][_0x4babd7(0x235)][_0x4babd7(0x57e)];},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x759)]=Game_Event[_0x4a5d62(0x5da)][_0x4a5d62(0x575)],Game_Event['prototype'][_0x4a5d62(0x575)]=function(_0x4a3b5b,_0x4869d7){const _0x3c9d7d=_0x4a5d62;return this[_0x3c9d7d(0x238)]()?this[_0x3c9d7d(0x31c)](_0x4a3b5b,_0x4869d7):VisuMZ[_0x3c9d7d(0x2df)][_0x3c9d7d(0x759)][_0x3c9d7d(0x35f)](this,_0x4a3b5b,_0x4869d7);},Game_Event[_0x4a5d62(0x5da)][_0x4a5d62(0x238)]=function(){const _0x3d4a79=_0x4a5d62;return VisuMZ['CoreEngine'][_0x3d4a79(0x7d0)][_0x3d4a79(0x235)][_0x3d4a79(0x3ed)];},Game_Event[_0x4a5d62(0x5da)][_0x4a5d62(0x31c)]=function(_0x4fe82e,_0x57ccbb){const _0x44d677=_0x4a5d62;if(!this['isNormalPriority']())return![];else{const _0x34526d=$gameMap[_0x44d677(0x982)](_0x4fe82e,_0x57ccbb)[_0x44d677(0x4a6)](_0x51ab9c=>_0x51ab9c['isNormalPriority']());return _0x34526d['length']>0x0;}},VisuMZ['CoreEngine'][_0x4a5d62(0x3e6)]=Game_Interpreter[_0x4a5d62(0x5da)][_0x4a5d62(0x78e)],Game_Interpreter[_0x4a5d62(0x5da)][_0x4a5d62(0x78e)]=function(_0x1b8754){const _0x574672=_0x4a5d62,_0x27522b=this[_0x574672(0x41e)]();return _0x27522b[_0x574672(0x245)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x574672(0x70e)](_0x27522b):VisuMZ[_0x574672(0x2df)]['Game_Interpreter_command105'][_0x574672(0x35f)](this,_0x1b8754);},Game_Interpreter[_0x4a5d62(0x5da)][_0x4a5d62(0x41e)]=function(){const _0x3eac9f=_0x4a5d62;let _0x1da2a1='',_0x4f4205=this['_index']+0x1;while(this[_0x3eac9f(0x358)][_0x4f4205]&&this[_0x3eac9f(0x358)][_0x4f4205][_0x3eac9f(0x74f)]===0x195){_0x1da2a1+=this[_0x3eac9f(0x358)][_0x4f4205]['parameters'][0x0]+'\x0a',_0x4f4205++;}return _0x1da2a1;},Game_Interpreter[_0x4a5d62(0x5da)][_0x4a5d62(0x70e)]=function(_0x36ca11){const _0x3a1b8d=_0x4a5d62;try{eval(_0x36ca11);}catch(_0x232ed6){$gameTemp[_0x3a1b8d(0x84c)]()&&(console[_0x3a1b8d(0x5f5)]('Show\x20Scrolling\x20Text\x20Script\x20Error'),console['log'](_0x232ed6));}return!![];},VisuMZ['CoreEngine'][_0x4a5d62(0x353)]=Game_Interpreter[_0x4a5d62(0x5da)]['command111'],Game_Interpreter[_0x4a5d62(0x5da)][_0x4a5d62(0x30d)]=function(_0x286d41){const _0x14f0cf=_0x4a5d62;try{VisuMZ[_0x14f0cf(0x2df)][_0x14f0cf(0x353)][_0x14f0cf(0x35f)](this,_0x286d41);}catch(_0x3d442e){$gameTemp[_0x14f0cf(0x84c)]()&&(console['log'](_0x14f0cf(0x94c)),console[_0x14f0cf(0x5f5)](_0x14f0cf(0x38c)+_0x286d41[0x1]),console['log'](_0x3d442e)),this[_0x14f0cf(0x91a)]();}return!![];},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x2e8)]=Game_Interpreter[_0x4a5d62(0x5da)][_0x4a5d62(0x3a4)],Game_Interpreter[_0x4a5d62(0x5da)][_0x4a5d62(0x3a4)]=function(_0x50dd13){const _0x157b73=_0x4a5d62;try{VisuMZ['CoreEngine'][_0x157b73(0x2e8)][_0x157b73(0x35f)](this,_0x50dd13);}catch(_0x3e04bf){$gameTemp[_0x157b73(0x84c)]()&&(console[_0x157b73(0x5f5)](_0x157b73(0x90c)),console[_0x157b73(0x5f5)](_0x3e04bf));}return!![];},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x938)]=Game_Interpreter[_0x4a5d62(0x5da)][_0x4a5d62(0x88e)],Game_Interpreter['prototype'][_0x4a5d62(0x88e)]=function(){const _0x3fab21=_0x4a5d62;let _0x463bda=this['currentCommand']()[_0x3fab21(0x7a1)][0x0]+'\x0a';while(this['nextEventCode']()===0x28f){this[_0x3fab21(0x3a1)]++,_0x463bda+=this[_0x3fab21(0x6ed)]()[_0x3fab21(0x7a1)][0x0]+'\x0a';}try{eval(_0x463bda);}catch(_0xc3aa20){$gameTemp['isPlaytest']()&&(console['log'](_0x3fab21(0x937)[_0x3fab21(0x807)](this[_0x3fab21(0x32d)]())),console[_0x3fab21(0x5f5)](_0x3fab21(0x20d)['format'](_0x463bda)),console['log'](_0xc3aa20));}return!![];},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x27f)]=Game_Interpreter[_0x4a5d62(0x5da)][_0x4a5d62(0x59d)],Game_Interpreter['prototype'][_0x4a5d62(0x59d)]=function(_0x1c0f28){const _0x4e55c3=_0x4a5d62;return $gameTemp[_0x4e55c3(0x6c4)](this),VisuMZ[_0x4e55c3(0x2df)][_0x4e55c3(0x27f)][_0x4e55c3(0x35f)](this,_0x1c0f28);},Scene_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x8b0)]=function(){const _0x1f0ec4=_0x4a5d62;return VisuMZ[_0x1f0ec4(0x2df)]['Settings']['UI'][_0x1f0ec4(0x5a8)];},Scene_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x4f3)]=function(){const _0x48ec6e=_0x4a5d62;return VisuMZ[_0x48ec6e(0x2df)][_0x48ec6e(0x7d0)]['UI'][_0x48ec6e(0x525)];},Scene_Base['prototype'][_0x4a5d62(0x4f1)]=function(){const _0x3310f2=_0x4a5d62;return VisuMZ['CoreEngine'][_0x3310f2(0x7d0)]['UI'][_0x3310f2(0x8f7)];},Scene_Base[_0x4a5d62(0x5da)]['isRightInputMode']=function(){const _0x123fcc=_0x4a5d62;return VisuMZ[_0x123fcc(0x2df)][_0x123fcc(0x7d0)]['UI'][_0x123fcc(0x403)];},Scene_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x573)]=function(){const _0x44e0af=_0x4a5d62;return VisuMZ[_0x44e0af(0x2df)]['Settings']['UI']['CommandWidth'];},Scene_Base[_0x4a5d62(0x5da)]['buttonAreaHeight']=function(){const _0x2c6fb2=_0x4a5d62;return VisuMZ[_0x2c6fb2(0x2df)][_0x2c6fb2(0x7d0)]['UI'][_0x2c6fb2(0x583)];},Scene_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x3bc)]=function(){const _0x302eec=_0x4a5d62;return VisuMZ[_0x302eec(0x2df)][_0x302eec(0x7d0)][_0x302eec(0x464)]['EnableMasking'];},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x28a)]=Scene_Base['prototype'][_0x4a5d62(0x8da)],Scene_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x8da)]=function(){const _0x124b19=_0x4a5d62;VisuMZ[_0x124b19(0x2df)][_0x124b19(0x28a)][_0x124b19(0x35f)](this),this[_0x124b19(0x7af)](),this[_0x124b19(0x7c6)](),this[_0x124b19(0x914)]['x']=Math[_0x124b19(0x372)](this[_0x124b19(0x914)]['x']),this[_0x124b19(0x914)]['y']=Math['round'](this['_windowLayer']['y']);},Scene_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x7af)]=function(){},Scene_Base[_0x4a5d62(0x5da)]['createTextPopupWindow']=function(){const _0x14e06b=_0x4a5d62;this[_0x14e06b(0x57c)]=new Window_TextPopup(),this[_0x14e06b(0x46e)](this[_0x14e06b(0x57c)]);},$textPopup=function(_0x457dc1){const _0x3768c4=_0x4a5d62,_0x194836=SceneManager[_0x3768c4(0x7d2)]['_textPopupWindow'];_0x194836&&_0x194836[_0x3768c4(0x711)](_0x457dc1);},Scene_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x574)]=function(){const _0xdecac3=_0x4a5d62;return TextManager[_0xdecac3(0x45f)](_0xdecac3(0x701),_0xdecac3(0x865));},Scene_Base['prototype']['buttonAssistKey2']=function(){const _0x24d985=_0x4a5d62;return TextManager[_0x24d985(0x52a)](_0x24d985(0x20a));},Scene_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x732)]=function(){const _0x395bae=_0x4a5d62;return TextManager['getInputButtonString'](_0x395bae(0x388));},Scene_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x4fc)]=function(){const _0x226f38=_0x4a5d62;return TextManager[_0x226f38(0x52a)]('ok');},Scene_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x70c)]=function(){const _0x48bc61=_0x4a5d62;return TextManager[_0x48bc61(0x52a)](_0x48bc61(0x1da));},Scene_Base['prototype'][_0x4a5d62(0x7f0)]=function(){const _0x51e72c=_0x4a5d62;return this[_0x51e72c(0x332)]&&this[_0x51e72c(0x332)][_0x51e72c(0x27a)]?TextManager[_0x51e72c(0x579)]:'';},Scene_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x6c8)]=function(){return'';},Scene_Base[_0x4a5d62(0x5da)]['buttonAssistText3']=function(){return'';},Scene_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x3f1)]=function(){return TextManager['buttonAssistOk'];},Scene_Base[_0x4a5d62(0x5da)]['buttonAssistText5']=function(){const _0xf871f6=_0x4a5d62;return TextManager[_0xf871f6(0x5a5)];},Scene_Base[_0x4a5d62(0x5da)]['buttonAssistOffset1']=function(){return 0x0;},Scene_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x999)]=function(){return 0x0;},Scene_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x7d6)]=function(){return 0x0;},Scene_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x936)]=function(){return 0x0;},Scene_Base['prototype']['buttonAssistOffset5']=function(){return 0x0;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x406)]=Scene_Boot[_0x4a5d62(0x5da)][_0x4a5d62(0x7ba)],Scene_Boot[_0x4a5d62(0x5da)][_0x4a5d62(0x7ba)]=function(){const _0x31a9fe=_0x4a5d62;VisuMZ[_0x31a9fe(0x2df)][_0x31a9fe(0x406)][_0x31a9fe(0x35f)](this),this[_0x31a9fe(0x71a)]();},Scene_Boot[_0x4a5d62(0x5da)][_0x4a5d62(0x71a)]=function(){const _0x7595d6=_0x4a5d62,_0x386ca5=[_0x7595d6(0x31e),_0x7595d6(0x2cc),_0x7595d6(0x557),_0x7595d6(0x6fe),_0x7595d6(0x51a),_0x7595d6(0x1c9),_0x7595d6(0x2ff),_0x7595d6(0x990),_0x7595d6(0x83e),_0x7595d6(0x296),_0x7595d6(0x35a),_0x7595d6(0x23e),_0x7595d6(0x7db),_0x7595d6(0x652)];for(const _0x34d705 of _0x386ca5){const _0x4449e8=VisuMZ['CoreEngine'][_0x7595d6(0x7d0)][_0x7595d6(0x789)][_0x34d705],_0x480ef5=_0x7595d6(0x3d3)[_0x7595d6(0x807)](_0x34d705);for(const _0x237f16 of _0x4449e8){ImageManager['loadBitmap'](_0x480ef5,_0x237f16);}}},VisuMZ[_0x4a5d62(0x2df)]['Scene_Boot_startNormalGame']=Scene_Boot[_0x4a5d62(0x5da)][_0x4a5d62(0x6e1)],Scene_Boot[_0x4a5d62(0x5da)][_0x4a5d62(0x6e1)]=function(){const _0x36413f=_0x4a5d62;Utils[_0x36413f(0x2b5)](_0x36413f(0x23a))&&VisuMZ[_0x36413f(0x2df)][_0x36413f(0x7d0)]['QoL'][_0x36413f(0x417)]?this[_0x36413f(0x654)]():VisuMZ[_0x36413f(0x2df)][_0x36413f(0x7c8)][_0x36413f(0x35f)](this);},Scene_Boot['prototype'][_0x4a5d62(0x654)]=function(){const _0x142fcf=_0x4a5d62;this[_0x142fcf(0x984)](),DataManager[_0x142fcf(0x57f)](),SceneManager[_0x142fcf(0x42f)](Scene_Map);},Scene_Boot[_0x4a5d62(0x5da)]['adjustBoxSize']=function(){const _0x193c30=_0x4a5d62,_0x6b46ab=$dataSystem[_0x193c30(0x897)][_0x193c30(0x65c)],_0x8b0161=$dataSystem['advanced'][_0x193c30(0x8fe)],_0x58db24=VisuMZ['CoreEngine'][_0x193c30(0x7d0)]['UI'][_0x193c30(0x595)];Graphics[_0x193c30(0x943)]=_0x6b46ab-_0x58db24*0x2,Graphics[_0x193c30(0x433)]=_0x8b0161-_0x58db24*0x2,this[_0x193c30(0x86e)]();},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x233)]=Scene_Boot[_0x4a5d62(0x5da)][_0x4a5d62(0x563)],Scene_Boot[_0x4a5d62(0x5da)]['updateDocumentTitle']=function(){const _0x2e96a7=_0x4a5d62;this[_0x2e96a7(0x72a)]()?this[_0x2e96a7(0x8f6)]():VisuMZ[_0x2e96a7(0x2df)][_0x2e96a7(0x233)][_0x2e96a7(0x35f)](this);},Scene_Boot[_0x4a5d62(0x5da)]['isFullDocumentTitle']=function(){const _0x2c36d3=_0x4a5d62;if(Scene_Title[_0x2c36d3(0x862)]==='')return![];if(Scene_Title['subtitle']==='Subtitle')return![];if(Scene_Title['version']==='')return![];if(Scene_Title['version']===_0x2c36d3(0x400))return![];return!![];},Scene_Boot[_0x4a5d62(0x5da)][_0x4a5d62(0x8f6)]=function(){const _0x333573=_0x4a5d62,_0x351c44=$dataSystem[_0x333573(0x24c)],_0x5b9d03=Scene_Title[_0x333573(0x862)]||'',_0x897338=Scene_Title[_0x333573(0x490)]||'',_0x3ec8e6=VisuMZ[_0x333573(0x2df)]['Settings'][_0x333573(0x60c)]['Title'][_0x333573(0x71e)],_0x4524eb=_0x3ec8e6[_0x333573(0x807)](_0x351c44,_0x5b9d03,_0x897338);document[_0x333573(0x83d)]=_0x4524eb;},Scene_Boot[_0x4a5d62(0x5da)][_0x4a5d62(0x86e)]=function(){const _0x1a8f52=_0x4a5d62;if(VisuMZ['CoreEngine'][_0x1a8f52(0x7d0)]['UI'][_0x1a8f52(0x75f)]){const _0x5bac45=Graphics[_0x1a8f52(0x6e0)]-Graphics[_0x1a8f52(0x943)]-VisuMZ[_0x1a8f52(0x2df)][_0x1a8f52(0x7d0)]['UI'][_0x1a8f52(0x595)]*0x2,_0xf2de9d=Sprite_Button[_0x1a8f52(0x5da)][_0x1a8f52(0x5fb)]['call'](this)*0x4;if(_0x5bac45>=_0xf2de9d)SceneManager[_0x1a8f52(0x3b0)](!![]);}},Scene_Title[_0x4a5d62(0x862)]=VisuMZ[_0x4a5d62(0x2df)]['Settings'][_0x4a5d62(0x60c)][_0x4a5d62(0x256)]['Subtitle'],Scene_Title[_0x4a5d62(0x490)]=VisuMZ['CoreEngine'][_0x4a5d62(0x7d0)]['MenuLayout']['Title'][_0x4a5d62(0x449)],Scene_Title[_0x4a5d62(0x2c9)]=VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x7d0)][_0x4a5d62(0x37f)],VisuMZ['CoreEngine'][_0x4a5d62(0x3a6)]=Scene_Title[_0x4a5d62(0x5da)][_0x4a5d62(0x720)],Scene_Title[_0x4a5d62(0x5da)][_0x4a5d62(0x720)]=function(){const _0x3c1cad=_0x4a5d62;VisuMZ[_0x3c1cad(0x2df)][_0x3c1cad(0x7d0)][_0x3c1cad(0x60c)][_0x3c1cad(0x256)][_0x3c1cad(0x720)][_0x3c1cad(0x35f)](this);if(Scene_Title['subtitle']!==''&&Scene_Title[_0x3c1cad(0x862)]!==_0x3c1cad(0x32a))this[_0x3c1cad(0x666)]();if(Scene_Title['version']!==''&&Scene_Title[_0x3c1cad(0x490)]!==_0x3c1cad(0x400))this[_0x3c1cad(0x2f3)]();},Scene_Title[_0x4a5d62(0x5da)]['drawGameSubtitle']=function(){const _0x5ce347=_0x4a5d62;VisuMZ['CoreEngine'][_0x5ce347(0x7d0)][_0x5ce347(0x60c)][_0x5ce347(0x256)][_0x5ce347(0x666)][_0x5ce347(0x35f)](this);},Scene_Title[_0x4a5d62(0x5da)]['drawGameVersion']=function(){const _0x47ff1a=_0x4a5d62;VisuMZ[_0x47ff1a(0x2df)][_0x47ff1a(0x7d0)][_0x47ff1a(0x60c)][_0x47ff1a(0x256)]['drawGameVersion'][_0x47ff1a(0x35f)](this);},Scene_Title[_0x4a5d62(0x5da)]['createCommandWindow']=function(){const _0x728d04=_0x4a5d62;this[_0x728d04(0x69a)]();const _0x365d45=$dataSystem['titleCommandWindow']['background'],_0x5ba79a=this[_0x728d04(0x482)]();this[_0x728d04(0x44c)]=new Window_TitleCommand(_0x5ba79a),this[_0x728d04(0x44c)]['setBackgroundType'](_0x365d45);const _0x1dcdf9=this[_0x728d04(0x482)]();this[_0x728d04(0x44c)][_0x728d04(0x7ed)](_0x1dcdf9['x'],_0x1dcdf9['y'],_0x1dcdf9[_0x728d04(0x6e0)],_0x1dcdf9[_0x728d04(0x592)]),this[_0x728d04(0x44c)]['createContents'](),this['_commandWindow']['refresh'](),this[_0x728d04(0x44c)]['selectLast'](),this['addWindow'](this['_commandWindow']);},Scene_Title['prototype'][_0x4a5d62(0x3b4)]=function(){const _0x5958c7=_0x4a5d62;return this['_commandWindow']?this['_commandWindow']['maxItems']():VisuMZ[_0x5958c7(0x2df)][_0x5958c7(0x7d0)][_0x5958c7(0x447)][_0x5958c7(0x6d1)];},Scene_Title[_0x4a5d62(0x5da)][_0x4a5d62(0x482)]=function(){const _0x1522f4=_0x4a5d62;return VisuMZ['CoreEngine'][_0x1522f4(0x7d0)][_0x1522f4(0x60c)]['Title'][_0x1522f4(0x513)]['call'](this);},Scene_Title['prototype'][_0x4a5d62(0x69a)]=function(){const _0x1c81b8=_0x4a5d62;for(const _0x74e31a of Scene_Title[_0x1c81b8(0x2c9)]){const _0xc80b67=new Sprite_TitlePictureButton(_0x74e31a);this[_0x1c81b8(0x46e)](_0xc80b67);}},VisuMZ['CoreEngine'][_0x4a5d62(0x54d)]=Scene_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x96b)],Scene_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x96b)]=function(){const _0x2f7808=_0x4a5d62;VisuMZ[_0x2f7808(0x2df)]['Scene_Map_initialize'][_0x2f7808(0x35f)](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),this[_0x2f7808(0x1bc)]();},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x776)]=Scene_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x1ae)],Scene_Map[_0x4a5d62(0x5da)]['updateMainMultiply']=function(){const _0x1585c7=_0x4a5d62;VisuMZ[_0x1585c7(0x2df)][_0x1585c7(0x776)][_0x1585c7(0x35f)](this),$gameTemp[_0x1585c7(0x646)]&&!$gameMessage[_0x1585c7(0x1fa)]()&&(this[_0x1585c7(0x32e)](),SceneManager[_0x1585c7(0x5d8)]());},Scene_Map[_0x4a5d62(0x5da)]['terminate']=function(){const _0x43b044=_0x4a5d62;Scene_Message[_0x43b044(0x5da)][_0x43b044(0x830)]['call'](this),!SceneManager[_0x43b044(0x1fe)](Scene_Battle)&&(this['_spriteset'][_0x43b044(0x8fa)](),this[_0x43b044(0x86a)][_0x43b044(0x6aa)](),this['_windowLayer'][_0x43b044(0x27a)]=![],SceneManager[_0x43b044(0x264)]()),$gameScreen[_0x43b044(0x53b)](),this['clearOnceParallelInterpreters']();},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x286)]=Scene_Map[_0x4a5d62(0x5da)]['createMenuButton'],Scene_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x2d4)]=function(){const _0x4c803c=_0x4a5d62;VisuMZ['CoreEngine'][_0x4c803c(0x286)][_0x4c803c(0x35f)](this),SceneManager[_0x4c803c(0x425)]()&&this[_0x4c803c(0x33b)]();},Scene_Map['prototype'][_0x4a5d62(0x33b)]=function(){const _0x4a3bfa=_0x4a5d62;this['_menuButton']['x']=Graphics[_0x4a3bfa(0x943)]+0x4;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x21f)]=Scene_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x854)],Scene_Map['prototype'][_0x4a5d62(0x854)]=function(){const _0x22b511=_0x4a5d62;VisuMZ[_0x22b511(0x2df)][_0x22b511(0x21f)][_0x22b511(0x35f)](this),this['updateDashToggle']();},Scene_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x68e)]=function(){const _0x29bec5=_0x4a5d62;Input['isTriggered'](_0x29bec5(0x782))&&(ConfigManager[_0x29bec5(0x917)]=!ConfigManager[_0x29bec5(0x917)],ConfigManager[_0x29bec5(0x495)]());},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x427)]=Scene_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x32e)],Scene_Map[_0x4a5d62(0x5da)]['updateMain']=function(){const _0x585aac=_0x4a5d62;VisuMZ[_0x585aac(0x2df)][_0x585aac(0x427)][_0x585aac(0x35f)](this),this['updateOnceParallelInterpreters']();},Scene_Map[_0x4a5d62(0x5da)]['clearOnceParallelInterpreters']=function(){this['_onceParallelInterpreters']=[];},Scene_Map['prototype'][_0x4a5d62(0x6f5)]=function(){const _0x194d45=_0x4a5d62;if(!this[_0x194d45(0x811)])return;for(const _0x346983 of this[_0x194d45(0x811)]){_0x346983&&_0x346983[_0x194d45(0x8fa)]();}},Scene_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x604)]=function(_0x16abd9,_0x5e7787){const _0x3e1eec=_0x4a5d62,_0x37a516=$dataCommonEvents[_0x16abd9];if(!_0x37a516)return;const _0x107b56=new Game_OnceParallelInterpreter();this['addOnceParallelInterpreter'](_0x107b56),_0x107b56[_0x3e1eec(0x682)](_0x16abd9),_0x107b56[_0x3e1eec(0x236)](_0x5e7787);},Scene_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x601)]=function(_0x3f9e62){const _0x6f3402=_0x4a5d62;this['_onceParallelInterpreters']=this[_0x6f3402(0x811)]||[],this['_onceParallelInterpreters'][_0x6f3402(0x98c)](_0x3f9e62);},Scene_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x3db)]=function(_0x50de16){const _0x4f558a=_0x4a5d62;this[_0x4f558a(0x811)]=this[_0x4f558a(0x811)]||[],this['_onceParallelInterpreters'][_0x4f558a(0x39a)](_0x50de16);};function Game_OnceParallelInterpreter(){const _0x295abb=_0x4a5d62;this[_0x295abb(0x96b)](...arguments);}Game_OnceParallelInterpreter[_0x4a5d62(0x5da)]=Object[_0x4a5d62(0x963)](Game_Interpreter[_0x4a5d62(0x5da)]),Game_OnceParallelInterpreter['prototype'][_0x4a5d62(0x58b)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x4a5d62(0x5da)][_0x4a5d62(0x682)]=function(_0x1da46f){const _0x498a0c=_0x4a5d62,_0x1f2f84=$dataCommonEvents[_0x1da46f];_0x1f2f84?this[_0x498a0c(0x684)](_0x1f2f84[_0x498a0c(0x56a)],0x0):this[_0x498a0c(0x830)]();},Game_OnceParallelInterpreter[_0x4a5d62(0x5da)][_0x4a5d62(0x236)]=function(_0x1a4da6){const _0x4ad138=_0x4a5d62;this[_0x4ad138(0x588)]=_0x1a4da6||0x0;},Game_OnceParallelInterpreter[_0x4a5d62(0x5da)][_0x4a5d62(0x830)]=function(){const _0x462a14=_0x4a5d62;if(!SceneManager[_0x462a14(0x89c)]())return;SceneManager[_0x462a14(0x7d2)][_0x462a14(0x3db)](this),Game_Interpreter[_0x462a14(0x5da)][_0x462a14(0x830)]['call'](this);},VisuMZ[_0x4a5d62(0x2df)]['Scene_MenuBase_helpAreaTop']=Scene_MenuBase[_0x4a5d62(0x5da)]['helpAreaTop'],Scene_MenuBase[_0x4a5d62(0x5da)][_0x4a5d62(0x40b)]=function(){const _0x151f91=_0x4a5d62;let _0x422de1=0x0;return SceneManager[_0x151f91(0x744)]()?_0x422de1=this['helpAreaTopSideButtonLayout']():_0x422de1=VisuMZ[_0x151f91(0x2df)]['Scene_MenuBase_helpAreaTop'][_0x151f91(0x35f)](this),_0x422de1;},Scene_MenuBase['prototype']['helpAreaTopSideButtonLayout']=function(){const _0x17bdd6=_0x4a5d62;return this[_0x17bdd6(0x4f3)]()?this[_0x17bdd6(0x705)]():0x0;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x834)]=Scene_MenuBase[_0x4a5d62(0x5da)][_0x4a5d62(0x6c5)],Scene_MenuBase[_0x4a5d62(0x5da)][_0x4a5d62(0x6c5)]=function(){const _0x269a88=_0x4a5d62;return SceneManager['areButtonsOutsideMainUI']()?this[_0x269a88(0x962)]():VisuMZ[_0x269a88(0x2df)]['Scene_MenuBase_mainAreaTop'][_0x269a88(0x35f)](this);},Scene_MenuBase[_0x4a5d62(0x5da)]['mainAreaTopSideButtonLayout']=function(){const _0x51a516=_0x4a5d62;if(!this[_0x51a516(0x4f3)]())return this[_0x51a516(0x6f4)]();else return this[_0x51a516(0x2d6)]()&&this[_0x51a516(0x2d1)]()==='top'?Window_ButtonAssist[_0x51a516(0x5da)]['lineHeight']():0x0;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x687)]=Scene_MenuBase['prototype'][_0x4a5d62(0x81d)],Scene_MenuBase[_0x4a5d62(0x5da)]['mainAreaHeight']=function(){const _0x207acf=_0x4a5d62;let _0x1f9b58=0x0;return SceneManager[_0x207acf(0x744)]()?_0x1f9b58=this['mainAreaHeightSideButtonLayout']():_0x1f9b58=VisuMZ[_0x207acf(0x2df)][_0x207acf(0x687)][_0x207acf(0x35f)](this),this[_0x207acf(0x2d6)]()&&this['getButtonAssistLocation']()!=='button'&&(_0x1f9b58-=Window_ButtonAssist['prototype'][_0x207acf(0x3aa)]()),_0x1f9b58;},Scene_MenuBase[_0x4a5d62(0x5da)][_0x4a5d62(0x75d)]=function(){const _0x37fb51=_0x4a5d62;return Graphics['boxHeight']-this[_0x37fb51(0x708)]();},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x929)]=Scene_MenuBase[_0x4a5d62(0x5da)][_0x4a5d62(0x7a4)],Scene_MenuBase[_0x4a5d62(0x5da)]['createBackground']=function(){const _0x5959fa=_0x4a5d62,_0x5c8cce=VisuMZ[_0x5959fa(0x2df)][_0x5959fa(0x7d0)]['MenuBg']['BlurStrength']??0x8;this[_0x5959fa(0x7b5)]=new PIXI['filters'][(_0x5959fa(0x97a))](_0x5c8cce),this['_backgroundSprite']=new Sprite(),this['_backgroundSprite']['bitmap']=SceneManager[_0x5959fa(0x27e)](),this[_0x5959fa(0x886)][_0x5959fa(0x7b7)]=[this['_backgroundFilter']],this[_0x5959fa(0x46e)](this['_backgroundSprite']),this[_0x5959fa(0x8e8)](0xc0),this['setBackgroundOpacity'](this[_0x5959fa(0x2dc)]()),this[_0x5959fa(0x8a8)]();},Scene_MenuBase['prototype'][_0x4a5d62(0x2dc)]=function(){const _0x5f595e=_0x4a5d62,_0x2f91e6=String(this[_0x5f595e(0x58b)]['name']),_0x4ed232=this[_0x5f595e(0x761)](_0x2f91e6);return _0x4ed232?_0x4ed232[_0x5f595e(0x486)]:0xc0;},Scene_MenuBase['prototype'][_0x4a5d62(0x8a8)]=function(){const _0x36a984=_0x4a5d62,_0x8451c9=String(this[_0x36a984(0x58b)][_0x36a984(0x79f)]),_0xd16ef5=this[_0x36a984(0x761)](_0x8451c9);_0xd16ef5&&(_0xd16ef5[_0x36a984(0x4c0)]!==''||_0xd16ef5['BgFilename2']!=='')&&(this[_0x36a984(0x2ed)]=new Sprite(ImageManager[_0x36a984(0x212)](_0xd16ef5[_0x36a984(0x4c0)])),this[_0x36a984(0x4a5)]=new Sprite(ImageManager[_0x36a984(0x331)](_0xd16ef5['BgFilename2'])),this[_0x36a984(0x46e)](this[_0x36a984(0x2ed)]),this[_0x36a984(0x46e)](this['_backSprite2']),this[_0x36a984(0x2ed)][_0x36a984(0x757)][_0x36a984(0x869)](this[_0x36a984(0x62e)][_0x36a984(0x37c)](this,this[_0x36a984(0x2ed)])),this[_0x36a984(0x4a5)][_0x36a984(0x757)][_0x36a984(0x869)](this[_0x36a984(0x62e)][_0x36a984(0x37c)](this,this[_0x36a984(0x4a5)])));},Scene_MenuBase[_0x4a5d62(0x5da)][_0x4a5d62(0x761)]=function(_0x540cc4){const _0x45dcc2=_0x4a5d62;return VisuMZ[_0x45dcc2(0x2df)][_0x45dcc2(0x7d0)]['MenuBg'][_0x540cc4]||VisuMZ[_0x45dcc2(0x2df)][_0x45dcc2(0x7d0)][_0x45dcc2(0x1f4)]['Scene_Unlisted'];},Scene_MenuBase[_0x4a5d62(0x5da)][_0x4a5d62(0x62e)]=function(_0x28a198){const _0x4c11a6=_0x4a5d62;this[_0x4c11a6(0x4ec)](_0x28a198),this[_0x4c11a6(0x657)](_0x28a198);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x760)]=Scene_MenuBase[_0x4a5d62(0x5da)][_0x4a5d62(0x9a2)],Scene_MenuBase['prototype'][_0x4a5d62(0x9a2)]=function(){const _0x2db8df=_0x4a5d62;VisuMZ[_0x2db8df(0x2df)][_0x2db8df(0x760)][_0x2db8df(0x35f)](this),SceneManager[_0x2db8df(0x425)]()&&this[_0x2db8df(0x392)]();},Scene_MenuBase[_0x4a5d62(0x5da)]['moveCancelButtonSideButtonLayout']=function(){const _0x1887e1=_0x4a5d62;this[_0x1887e1(0x67b)]['x']=Graphics[_0x1887e1(0x943)]+0x4;},VisuMZ['CoreEngine'][_0x4a5d62(0x4a0)]=Scene_MenuBase[_0x4a5d62(0x5da)]['createPageButtons'],Scene_MenuBase[_0x4a5d62(0x5da)][_0x4a5d62(0x8ed)]=function(){const _0x6596b6=_0x4a5d62;VisuMZ['CoreEngine'][_0x6596b6(0x4a0)][_0x6596b6(0x35f)](this),SceneManager[_0x6596b6(0x425)]()&&this[_0x6596b6(0x5de)]();},Scene_MenuBase['prototype'][_0x4a5d62(0x5de)]=function(){const _0xca8b5e=_0x4a5d62;this[_0xca8b5e(0x332)]['x']=-0x1*(this[_0xca8b5e(0x332)]['width']+this[_0xca8b5e(0x413)]['width']+0x8),this[_0xca8b5e(0x413)]['x']=-0x1*(this[_0xca8b5e(0x413)][_0xca8b5e(0x6e0)]+0x4);},Scene_MenuBase['prototype'][_0x4a5d62(0x2d6)]=function(){const _0x4443d9=_0x4a5d62;return VisuMZ['CoreEngine'][_0x4443d9(0x7d0)][_0x4443d9(0x8a1)]['Enable'];},Scene_MenuBase['prototype']['getButtonAssistLocation']=function(){const _0x1b80ae=_0x4a5d62;return SceneManager['isSideButtonLayout']()||SceneManager[_0x1b80ae(0x1db)]()?VisuMZ[_0x1b80ae(0x2df)][_0x1b80ae(0x7d0)][_0x1b80ae(0x8a1)][_0x1b80ae(0x488)]:'button';},Scene_MenuBase['prototype'][_0x4a5d62(0x7af)]=function(){const _0x2ed7c0=_0x4a5d62;if(!this['isMenuButtonAssistEnabled']())return;const _0x13d876=this[_0x2ed7c0(0x8c1)]();this[_0x2ed7c0(0x6ad)]=new Window_ButtonAssist(_0x13d876),this[_0x2ed7c0(0x818)](this[_0x2ed7c0(0x6ad)]);},Scene_MenuBase[_0x4a5d62(0x5da)][_0x4a5d62(0x8c1)]=function(){const _0x1e244a=_0x4a5d62;return this[_0x1e244a(0x2d1)]()===_0x1e244a(0x68b)?this[_0x1e244a(0x73d)]():this['buttonAssistWindowSideRect']();},Scene_MenuBase[_0x4a5d62(0x5da)][_0x4a5d62(0x73d)]=function(){const _0x10b160=_0x4a5d62,_0x5ef3e6=ConfigManager[_0x10b160(0x87e)]?(Sprite_Button['prototype'][_0x10b160(0x5fb)]()+0x6)*0x2:0x0,_0x1ffd01=this[_0x10b160(0x539)](),_0xd1921e=Graphics['boxWidth']-_0x5ef3e6*0x2,_0x20dec8=this['buttonAreaHeight']();return new Rectangle(_0x5ef3e6,_0x1ffd01,_0xd1921e,_0x20dec8);},Scene_MenuBase[_0x4a5d62(0x5da)][_0x4a5d62(0x8b4)]=function(){const _0x7d6503=_0x4a5d62,_0x342867=Graphics['boxWidth'],_0x5f3b7d=Window_ButtonAssist[_0x7d6503(0x5da)][_0x7d6503(0x3aa)](),_0x781376=0x0;let _0x1d8b9b=0x0;return this[_0x7d6503(0x2d1)]()===_0x7d6503(0x387)?_0x1d8b9b=0x0:_0x1d8b9b=Graphics[_0x7d6503(0x433)]-_0x5f3b7d,new Rectangle(_0x781376,_0x1d8b9b,_0x342867,_0x5f3b7d);},Scene_Menu[_0x4a5d62(0x5a4)]=VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x7d0)][_0x4a5d62(0x60c)]['MainMenu'],VisuMZ[_0x4a5d62(0x2df)]['Scene_Menu_create']=Scene_Menu[_0x4a5d62(0x5da)]['create'],Scene_Menu[_0x4a5d62(0x5da)][_0x4a5d62(0x963)]=function(){const _0xc83601=_0x4a5d62;VisuMZ['CoreEngine'][_0xc83601(0x424)][_0xc83601(0x35f)](this),this[_0xc83601(0x7e7)]();},Scene_Menu['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x4362da=_0x4a5d62;this[_0x4362da(0x44c)]&&this['_commandWindow'][_0x4362da(0x49a)](Scene_Menu[_0x4362da(0x5a4)][_0x4362da(0x47e)]),this[_0x4362da(0x505)]&&this[_0x4362da(0x505)][_0x4362da(0x49a)](Scene_Menu[_0x4362da(0x5a4)][_0x4362da(0x402)]),this[_0x4362da(0x5f2)]&&this[_0x4362da(0x5f2)][_0x4362da(0x49a)](Scene_Menu[_0x4362da(0x5a4)][_0x4362da(0x1ea)]);},Scene_Menu[_0x4a5d62(0x5da)][_0x4a5d62(0x482)]=function(){const _0x5a0c16=_0x4a5d62;return Scene_Menu[_0x5a0c16(0x5a4)][_0x5a0c16(0x513)][_0x5a0c16(0x35f)](this);},Scene_Menu[_0x4a5d62(0x5da)][_0x4a5d62(0x7e6)]=function(){const _0x17d4d3=_0x4a5d62;return Scene_Menu[_0x17d4d3(0x5a4)]['GoldRect'][_0x17d4d3(0x35f)](this);},Scene_Menu['prototype'][_0x4a5d62(0x8d5)]=function(){const _0x357fa6=_0x4a5d62;return Scene_Menu['layoutSettings'][_0x357fa6(0x624)][_0x357fa6(0x35f)](this);},Scene_Item['layoutSettings']=VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x7d0)][_0x4a5d62(0x60c)][_0x4a5d62(0x30b)],VisuMZ[_0x4a5d62(0x2df)]['Scene_Item_create']=Scene_Item[_0x4a5d62(0x5da)][_0x4a5d62(0x963)],Scene_Item[_0x4a5d62(0x5da)]['create']=function(){const _0xe47ff0=_0x4a5d62;VisuMZ['CoreEngine'][_0xe47ff0(0x536)][_0xe47ff0(0x35f)](this),this[_0xe47ff0(0x7e7)]();},Scene_Item['prototype'][_0x4a5d62(0x7e7)]=function(){const _0x386241=_0x4a5d62;this['_helpWindow']&&this[_0x386241(0x221)][_0x386241(0x49a)](Scene_Item[_0x386241(0x5a4)][_0x386241(0x979)]),this[_0x386241(0x8ee)]&&this[_0x386241(0x8ee)][_0x386241(0x49a)](Scene_Item[_0x386241(0x5a4)]['CategoryBgType']),this[_0x386241(0x39d)]&&this['_itemWindow']['setBackgroundType'](Scene_Item[_0x386241(0x5a4)][_0x386241(0x28f)]),this[_0x386241(0x344)]&&this[_0x386241(0x344)][_0x386241(0x49a)](Scene_Item[_0x386241(0x5a4)][_0x386241(0x1de)]);},Scene_Item['prototype'][_0x4a5d62(0x6a9)]=function(){const _0x4cc808=_0x4a5d62;return Scene_Item[_0x4cc808(0x5a4)]['HelpRect']['call'](this);},Scene_Item[_0x4a5d62(0x5da)][_0x4a5d62(0x55f)]=function(){const _0x3dceec=_0x4a5d62;return Scene_Item[_0x3dceec(0x5a4)][_0x3dceec(0x3a5)][_0x3dceec(0x35f)](this);},Scene_Item[_0x4a5d62(0x5da)]['itemWindowRect']=function(){const _0x43fb90=_0x4a5d62;return Scene_Item[_0x43fb90(0x5a4)][_0x43fb90(0x39f)][_0x43fb90(0x35f)](this);},Scene_Item['prototype']['actorWindowRect']=function(){const _0x4dcbe6=_0x4a5d62;return Scene_Item[_0x4dcbe6(0x5a4)]['ActorRect'][_0x4dcbe6(0x35f)](this);},Scene_Skill['layoutSettings']=VisuMZ[_0x4a5d62(0x2df)]['Settings'][_0x4a5d62(0x60c)][_0x4a5d62(0x494)],VisuMZ['CoreEngine']['Scene_Skill_create']=Scene_Skill[_0x4a5d62(0x5da)][_0x4a5d62(0x963)],Scene_Skill[_0x4a5d62(0x5da)][_0x4a5d62(0x963)]=function(){const _0x212d5=_0x4a5d62;VisuMZ[_0x212d5(0x2df)][_0x212d5(0x478)][_0x212d5(0x35f)](this),this[_0x212d5(0x7e7)]();},Scene_Skill[_0x4a5d62(0x5da)][_0x4a5d62(0x7e7)]=function(){const _0x2b2313=_0x4a5d62;this[_0x2b2313(0x221)]&&this[_0x2b2313(0x221)]['setBackgroundType'](Scene_Skill['layoutSettings'][_0x2b2313(0x979)]),this['_skillTypeWindow']&&this['_skillTypeWindow'][_0x2b2313(0x49a)](Scene_Skill[_0x2b2313(0x5a4)][_0x2b2313(0x65b)]),this[_0x2b2313(0x5f2)]&&this[_0x2b2313(0x5f2)]['setBackgroundType'](Scene_Skill[_0x2b2313(0x5a4)][_0x2b2313(0x1ea)]),this[_0x2b2313(0x39d)]&&this['_itemWindow'][_0x2b2313(0x49a)](Scene_Skill[_0x2b2313(0x5a4)][_0x2b2313(0x28f)]),this[_0x2b2313(0x344)]&&this[_0x2b2313(0x344)][_0x2b2313(0x49a)](Scene_Skill[_0x2b2313(0x5a4)][_0x2b2313(0x1de)]);},Scene_Skill['prototype'][_0x4a5d62(0x6a9)]=function(){const _0x34b44c=_0x4a5d62;return Scene_Skill['layoutSettings'][_0x34b44c(0x77f)]['call'](this);},Scene_Skill[_0x4a5d62(0x5da)]['skillTypeWindowRect']=function(){const _0x348fc9=_0x4a5d62;return Scene_Skill['layoutSettings'][_0x348fc9(0x469)][_0x348fc9(0x35f)](this);},Scene_Skill[_0x4a5d62(0x5da)][_0x4a5d62(0x8d5)]=function(){const _0x51083c=_0x4a5d62;return Scene_Skill[_0x51083c(0x5a4)][_0x51083c(0x624)]['call'](this);},Scene_Skill[_0x4a5d62(0x5da)][_0x4a5d62(0x7eb)]=function(){const _0x1d7dca=_0x4a5d62;return Scene_Skill[_0x1d7dca(0x5a4)][_0x1d7dca(0x39f)][_0x1d7dca(0x35f)](this);},Scene_Skill['prototype'][_0x4a5d62(0x83b)]=function(){const _0x51cede=_0x4a5d62;return Scene_Skill[_0x51cede(0x5a4)][_0x51cede(0x506)]['call'](this);},Scene_Equip[_0x4a5d62(0x5a4)]=VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x7d0)]['MenuLayout'][_0x4a5d62(0x81e)],VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x6b7)]=Scene_Equip['prototype'][_0x4a5d62(0x963)],Scene_Equip['prototype'][_0x4a5d62(0x963)]=function(){const _0x3e2030=_0x4a5d62;VisuMZ['CoreEngine'][_0x3e2030(0x6b7)][_0x3e2030(0x35f)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip['prototype'][_0x4a5d62(0x7e7)]=function(){const _0x166f21=_0x4a5d62;this[_0x166f21(0x221)]&&this[_0x166f21(0x221)][_0x166f21(0x49a)](Scene_Equip[_0x166f21(0x5a4)][_0x166f21(0x979)]),this[_0x166f21(0x5f2)]&&this[_0x166f21(0x5f2)][_0x166f21(0x49a)](Scene_Equip['layoutSettings'][_0x166f21(0x1ea)]),this[_0x166f21(0x44c)]&&this[_0x166f21(0x44c)]['setBackgroundType'](Scene_Equip[_0x166f21(0x5a4)][_0x166f21(0x47e)]),this[_0x166f21(0x81b)]&&this['_slotWindow']['setBackgroundType'](Scene_Equip[_0x166f21(0x5a4)]['SlotBgType']),this[_0x166f21(0x39d)]&&this[_0x166f21(0x39d)][_0x166f21(0x49a)](Scene_Equip[_0x166f21(0x5a4)][_0x166f21(0x28f)]);},Scene_Equip[_0x4a5d62(0x5da)]['helpWindowRect']=function(){const _0x356a6a=_0x4a5d62;return Scene_Equip['layoutSettings']['HelpRect'][_0x356a6a(0x35f)](this);},Scene_Equip['prototype'][_0x4a5d62(0x8d5)]=function(){const _0x522ce7=_0x4a5d62;return Scene_Equip[_0x522ce7(0x5a4)][_0x522ce7(0x624)][_0x522ce7(0x35f)](this);},Scene_Equip[_0x4a5d62(0x5da)]['commandWindowRect']=function(){const _0x2fdf2c=_0x4a5d62;return Scene_Equip[_0x2fdf2c(0x5a4)][_0x2fdf2c(0x513)][_0x2fdf2c(0x35f)](this);},Scene_Equip[_0x4a5d62(0x5da)][_0x4a5d62(0x448)]=function(){const _0x45a657=_0x4a5d62;return Scene_Equip['layoutSettings'][_0x45a657(0x1af)][_0x45a657(0x35f)](this);},Scene_Equip[_0x4a5d62(0x5da)]['itemWindowRect']=function(){const _0x1f78e5=_0x4a5d62;return Scene_Equip[_0x1f78e5(0x5a4)][_0x1f78e5(0x39f)][_0x1f78e5(0x35f)](this);},Scene_Status['layoutSettings']=VisuMZ['CoreEngine'][_0x4a5d62(0x7d0)][_0x4a5d62(0x60c)][_0x4a5d62(0x754)],VisuMZ['CoreEngine'][_0x4a5d62(0x799)]=Scene_Status[_0x4a5d62(0x5da)][_0x4a5d62(0x963)],Scene_Status['prototype'][_0x4a5d62(0x963)]=function(){const _0x1edff7=_0x4a5d62;VisuMZ[_0x1edff7(0x2df)][_0x1edff7(0x799)][_0x1edff7(0x35f)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Status['prototype'][_0x4a5d62(0x7e7)]=function(){const _0x26b341=_0x4a5d62;this[_0x26b341(0x5be)]&&this[_0x26b341(0x5be)][_0x26b341(0x49a)](Scene_Status[_0x26b341(0x5a4)][_0x26b341(0x3ce)]),this['_statusWindow']&&this[_0x26b341(0x5f2)][_0x26b341(0x49a)](Scene_Status[_0x26b341(0x5a4)][_0x26b341(0x1ea)]),this['_statusParamsWindow']&&this[_0x26b341(0x50d)][_0x26b341(0x49a)](Scene_Status[_0x26b341(0x5a4)][_0x26b341(0x492)]),this[_0x26b341(0x1ff)]&&this[_0x26b341(0x1ff)]['setBackgroundType'](Scene_Status[_0x26b341(0x5a4)][_0x26b341(0x30e)]);},Scene_Status[_0x4a5d62(0x5da)][_0x4a5d62(0x69b)]=function(){const _0x1420d9=_0x4a5d62;return Scene_Status[_0x1420d9(0x5a4)][_0x1420d9(0x4b0)][_0x1420d9(0x35f)](this);},Scene_Status['prototype'][_0x4a5d62(0x8d5)]=function(){const _0x3e18a1=_0x4a5d62;return Scene_Status[_0x3e18a1(0x5a4)][_0x3e18a1(0x624)]['call'](this);},Scene_Status['prototype']['statusParamsWindowRect']=function(){const _0x2b4917=_0x4a5d62;return Scene_Status['layoutSettings'][_0x2b4917(0x3cb)][_0x2b4917(0x35f)](this);},Scene_Status['prototype']['statusEquipWindowRect']=function(){const _0x189c08=_0x4a5d62;return Scene_Status[_0x189c08(0x5a4)]['StatusEquipRect'][_0x189c08(0x35f)](this);},Scene_Options[_0x4a5d62(0x5a4)]=VisuMZ['CoreEngine'][_0x4a5d62(0x7d0)][_0x4a5d62(0x60c)][_0x4a5d62(0x3ec)],VisuMZ['CoreEngine'][_0x4a5d62(0x664)]=Scene_Options[_0x4a5d62(0x5da)][_0x4a5d62(0x963)],Scene_Options[_0x4a5d62(0x5da)][_0x4a5d62(0x963)]=function(){const _0x5f15c6=_0x4a5d62;VisuMZ['CoreEngine'][_0x5f15c6(0x664)][_0x5f15c6(0x35f)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Options[_0x4a5d62(0x5da)][_0x4a5d62(0x7e7)]=function(){const _0x63f152=_0x4a5d62;this[_0x63f152(0x70d)]&&this[_0x63f152(0x70d)]['setBackgroundType'](Scene_Options['layoutSettings']['OptionsBgType']);},Scene_Options[_0x4a5d62(0x5da)][_0x4a5d62(0x428)]=function(){const _0x4622f1=_0x4a5d62;return Scene_Options[_0x4622f1(0x5a4)][_0x4622f1(0x9a7)][_0x4622f1(0x35f)](this);},Scene_Save[_0x4a5d62(0x5a4)]=VisuMZ['CoreEngine'][_0x4a5d62(0x7d0)][_0x4a5d62(0x60c)][_0x4a5d62(0x918)],Scene_Save['prototype'][_0x4a5d62(0x963)]=function(){const _0x43ae66=_0x4a5d62;Scene_File['prototype'][_0x43ae66(0x963)][_0x43ae66(0x35f)](this),this[_0x43ae66(0x7e7)]();},Scene_Save[_0x4a5d62(0x5da)][_0x4a5d62(0x7e7)]=function(){const _0x476079=_0x4a5d62;this[_0x476079(0x221)]&&this[_0x476079(0x221)]['setBackgroundType'](Scene_Save[_0x476079(0x5a4)][_0x476079(0x979)]),this[_0x476079(0x780)]&&this['_listWindow'][_0x476079(0x49a)](Scene_Save[_0x476079(0x5a4)][_0x476079(0x4ff)]);},Scene_Save[_0x4a5d62(0x5da)]['helpWindowRect']=function(){const _0x5ea273=_0x4a5d62;return Scene_Save['layoutSettings'][_0x5ea273(0x77f)][_0x5ea273(0x35f)](this);},Scene_Save[_0x4a5d62(0x5da)][_0x4a5d62(0x434)]=function(){const _0x31ce82=_0x4a5d62;return Scene_Save['layoutSettings'][_0x31ce82(0x925)]['call'](this);},Scene_Load[_0x4a5d62(0x5a4)]=VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x7d0)]['MenuLayout'][_0x4a5d62(0x7fb)],Scene_Load[_0x4a5d62(0x5da)][_0x4a5d62(0x963)]=function(){const _0x31dd8c=_0x4a5d62;Scene_File['prototype'][_0x31dd8c(0x963)][_0x31dd8c(0x35f)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Load['prototype'][_0x4a5d62(0x7e7)]=function(){const _0x100656=_0x4a5d62;this[_0x100656(0x221)]&&this['_helpWindow'][_0x100656(0x49a)](Scene_Load[_0x100656(0x5a4)][_0x100656(0x979)]),this[_0x100656(0x780)]&&this[_0x100656(0x780)][_0x100656(0x49a)](Scene_Load['layoutSettings'][_0x100656(0x4ff)]);},Scene_Load['prototype'][_0x4a5d62(0x6a9)]=function(){const _0x3270e3=_0x4a5d62;return Scene_Load[_0x3270e3(0x5a4)]['HelpRect'][_0x3270e3(0x35f)](this);},Scene_Load[_0x4a5d62(0x5da)][_0x4a5d62(0x434)]=function(){const _0x43d3b3=_0x4a5d62;return Scene_Load[_0x43d3b3(0x5a4)][_0x43d3b3(0x925)][_0x43d3b3(0x35f)](this);};function Scene_QuickLoad(){const _0x28f92d=_0x4a5d62;this[_0x28f92d(0x96b)](...arguments);}Scene_QuickLoad[_0x4a5d62(0x5da)]=Object['create'](Scene_Load[_0x4a5d62(0x5da)]),Scene_QuickLoad[_0x4a5d62(0x5da)][_0x4a5d62(0x58b)]=Scene_QuickLoad,Scene_QuickLoad[_0x4a5d62(0x5da)][_0x4a5d62(0x96b)]=function(){const _0x3bea90=_0x4a5d62;Scene_Load[_0x3bea90(0x5da)][_0x3bea90(0x96b)][_0x3bea90(0x35f)](this);},Scene_QuickLoad['prototype'][_0x4a5d62(0x963)]=function(){const _0x98d3a1=_0x4a5d62;this[_0x98d3a1(0x7bd)](this[_0x98d3a1(0x549)]);},Scene_QuickLoad[_0x4a5d62(0x5da)]['prepare']=function(_0x25e90e){const _0x480845=_0x4a5d62;this[_0x480845(0x549)]=_0x25e90e;},Scene_QuickLoad[_0x4a5d62(0x5da)]['start']=function(){const _0x24321b=_0x4a5d62;Scene_MenuBase[_0x24321b(0x5da)][_0x24321b(0x360)][_0x24321b(0x35f)](this);},Scene_GameEnd[_0x4a5d62(0x5a4)]=VisuMZ[_0x4a5d62(0x2df)]['Settings'][_0x4a5d62(0x60c)]['GameEnd'],VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x4a2)]=Scene_GameEnd[_0x4a5d62(0x5da)][_0x4a5d62(0x7a4)],Scene_GameEnd[_0x4a5d62(0x5da)][_0x4a5d62(0x7a4)]=function(){const _0x4d5841=_0x4a5d62;Scene_MenuBase[_0x4d5841(0x5da)][_0x4d5841(0x7a4)][_0x4d5841(0x35f)](this);},Scene_GameEnd[_0x4a5d62(0x5da)][_0x4a5d62(0x5af)]=function(){const _0x36b495=_0x4a5d62,_0x82b375=this[_0x36b495(0x482)]();this[_0x36b495(0x44c)]=new Window_GameEnd(_0x82b375),this['_commandWindow']['setHandler'](_0x36b495(0x1da),this[_0x36b495(0x533)][_0x36b495(0x37c)](this)),this[_0x36b495(0x818)](this['_commandWindow']),this[_0x36b495(0x44c)]['setBackgroundType'](Scene_GameEnd[_0x36b495(0x5a4)][_0x36b495(0x47e)]);},Scene_GameEnd[_0x4a5d62(0x5da)][_0x4a5d62(0x482)]=function(){const _0x4a1b45=_0x4a5d62;return Scene_GameEnd[_0x4a1b45(0x5a4)][_0x4a1b45(0x513)][_0x4a1b45(0x35f)](this);},Scene_Shop[_0x4a5d62(0x5a4)]=VisuMZ[_0x4a5d62(0x2df)]['Settings']['MenuLayout'][_0x4a5d62(0x639)],VisuMZ[_0x4a5d62(0x2df)]['Scene_Shop_create']=Scene_Shop[_0x4a5d62(0x5da)][_0x4a5d62(0x963)],Scene_Shop[_0x4a5d62(0x5da)][_0x4a5d62(0x963)]=function(){const _0x1948f0=_0x4a5d62;VisuMZ[_0x1948f0(0x2df)][_0x1948f0(0x75b)][_0x1948f0(0x35f)](this),this[_0x1948f0(0x7e7)]();},Scene_Shop['prototype'][_0x4a5d62(0x7e7)]=function(){const _0x2f9a49=_0x4a5d62;this['_helpWindow']&&this['_helpWindow'][_0x2f9a49(0x49a)](Scene_Shop[_0x2f9a49(0x5a4)][_0x2f9a49(0x979)]),this[_0x2f9a49(0x505)]&&this[_0x2f9a49(0x505)][_0x2f9a49(0x49a)](Scene_Shop[_0x2f9a49(0x5a4)]['GoldBgType']),this[_0x2f9a49(0x44c)]&&this[_0x2f9a49(0x44c)]['setBackgroundType'](Scene_Shop[_0x2f9a49(0x5a4)]['CommandBgType']),this['_dummyWindow']&&this[_0x2f9a49(0x73c)][_0x2f9a49(0x49a)](Scene_Shop['layoutSettings'][_0x2f9a49(0x954)]),this['_numberWindow']&&this[_0x2f9a49(0x613)]['setBackgroundType'](Scene_Shop[_0x2f9a49(0x5a4)][_0x2f9a49(0x248)]),this[_0x2f9a49(0x5f2)]&&this['_statusWindow'][_0x2f9a49(0x49a)](Scene_Shop['layoutSettings'][_0x2f9a49(0x1ea)]),this[_0x2f9a49(0x374)]&&this[_0x2f9a49(0x374)][_0x2f9a49(0x49a)](Scene_Shop['layoutSettings'][_0x2f9a49(0x2ab)]),this['_categoryWindow']&&this[_0x2f9a49(0x8ee)][_0x2f9a49(0x49a)](Scene_Shop[_0x2f9a49(0x5a4)][_0x2f9a49(0x6dd)]),this['_sellWindow']&&this[_0x2f9a49(0x263)][_0x2f9a49(0x49a)](Scene_Shop[_0x2f9a49(0x5a4)][_0x2f9a49(0x7cc)]);},Scene_Shop[_0x4a5d62(0x5da)][_0x4a5d62(0x6a9)]=function(){const _0x2918e8=_0x4a5d62;return Scene_Shop[_0x2918e8(0x5a4)][_0x2918e8(0x77f)][_0x2918e8(0x35f)](this);},Scene_Shop[_0x4a5d62(0x5da)][_0x4a5d62(0x7e6)]=function(){const _0x392cdb=_0x4a5d62;return Scene_Shop[_0x392cdb(0x5a4)]['GoldRect'][_0x392cdb(0x35f)](this);},Scene_Shop['prototype']['commandWindowRect']=function(){const _0x55b246=_0x4a5d62;return Scene_Shop['layoutSettings'][_0x55b246(0x513)][_0x55b246(0x35f)](this);},Scene_Shop[_0x4a5d62(0x5da)][_0x4a5d62(0x1e1)]=function(){const _0xbc37b0=_0x4a5d62;return Scene_Shop['layoutSettings'][_0xbc37b0(0x531)][_0xbc37b0(0x35f)](this);},Scene_Shop[_0x4a5d62(0x5da)][_0x4a5d62(0x6de)]=function(){const _0x11af12=_0x4a5d62;return Scene_Shop[_0x11af12(0x5a4)][_0x11af12(0x7cf)][_0x11af12(0x35f)](this);},Scene_Shop[_0x4a5d62(0x5da)][_0x4a5d62(0x8d5)]=function(){const _0x54a214=_0x4a5d62;return Scene_Shop[_0x54a214(0x5a4)]['StatusRect']['call'](this);},Scene_Shop[_0x4a5d62(0x5da)][_0x4a5d62(0x6a1)]=function(){const _0x386949=_0x4a5d62;return Scene_Shop[_0x386949(0x5a4)]['BuyRect'][_0x386949(0x35f)](this);},Scene_Shop[_0x4a5d62(0x5da)][_0x4a5d62(0x55f)]=function(){const _0x1deb24=_0x4a5d62;return Scene_Shop[_0x1deb24(0x5a4)]['CategoryRect'][_0x1deb24(0x35f)](this);},Scene_Shop[_0x4a5d62(0x5da)][_0x4a5d62(0x504)]=function(){const _0x4f02c5=_0x4a5d62;return Scene_Shop[_0x4f02c5(0x5a4)][_0x4f02c5(0x598)][_0x4f02c5(0x35f)](this);},Scene_Name[_0x4a5d62(0x5a4)]=VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x7d0)][_0x4a5d62(0x60c)][_0x4a5d62(0x949)],VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x489)]=Scene_Name[_0x4a5d62(0x5da)][_0x4a5d62(0x963)],Scene_Name[_0x4a5d62(0x5da)][_0x4a5d62(0x963)]=function(){const _0x596ffd=_0x4a5d62;VisuMZ[_0x596ffd(0x2df)][_0x596ffd(0x489)]['call'](this),this[_0x596ffd(0x7e7)]();},Scene_Name[_0x4a5d62(0x5da)][_0x4a5d62(0x7e7)]=function(){const _0x25eaa8=_0x4a5d62;this['_editWindow']&&this[_0x25eaa8(0x73b)]['setBackgroundType'](Scene_Name['layoutSettings']['EditBgType']),this[_0x25eaa8(0x90a)]&&this[_0x25eaa8(0x90a)][_0x25eaa8(0x49a)](Scene_Name['layoutSettings'][_0x25eaa8(0x6eb)]);},Scene_Name['prototype'][_0x4a5d62(0x708)]=function(){return 0x0;},Scene_Name[_0x4a5d62(0x5da)][_0x4a5d62(0x338)]=function(){const _0x437cfe=_0x4a5d62;return Scene_Name[_0x437cfe(0x5a4)][_0x437cfe(0x696)][_0x437cfe(0x35f)](this);},Scene_Name[_0x4a5d62(0x5da)][_0x4a5d62(0x704)]=function(){const _0x398010=_0x4a5d62;return Scene_Name[_0x398010(0x5a4)]['InputRect'][_0x398010(0x35f)](this);},Scene_Name[_0x4a5d62(0x5da)][_0x4a5d62(0x92f)]=function(){const _0x573174=_0x4a5d62;if(!this[_0x573174(0x90a)])return![];return VisuMZ[_0x573174(0x2df)][_0x573174(0x7d0)][_0x573174(0x994)]['EnableNameInput'];},Scene_Name[_0x4a5d62(0x5da)][_0x4a5d62(0x574)]=function(){const _0x13abe9=_0x4a5d62;if(this[_0x13abe9(0x92f)]()&&this[_0x13abe9(0x90a)][_0x13abe9(0x6bb)]!==_0x13abe9(0x316))return TextManager['getInputMultiButtonStrings']('pageup',_0x13abe9(0x865));return Scene_MenuBase[_0x13abe9(0x5da)]['buttonAssistKey1']['call'](this);},Scene_Name[_0x4a5d62(0x5da)]['buttonAssistKey3']=function(){const _0x4ed2cb=_0x4a5d62;return this[_0x4ed2cb(0x92f)]()?TextManager[_0x4ed2cb(0x52a)]('tab'):Scene_MenuBase[_0x4ed2cb(0x5da)]['buttonAssistKey3'][_0x4ed2cb(0x35f)](this);},Scene_Name['prototype']['buttonAssistKey4']=function(){const _0x3baf05=_0x4a5d62;if(this[_0x3baf05(0x92f)]()&&this[_0x3baf05(0x90a)]['_mode']===_0x3baf05(0x316))return TextManager['makeInputButtonString']([_0x3baf05(0x8af)]);return Scene_MenuBase[_0x3baf05(0x5da)][_0x3baf05(0x4fc)][_0x3baf05(0x35f)](this);},Scene_Name[_0x4a5d62(0x5da)][_0x4a5d62(0x70c)]=function(){const _0x42d706=_0x4a5d62;if(this[_0x42d706(0x92f)]()&&this[_0x42d706(0x90a)]['_mode']==='keyboard')return TextManager['makeInputButtonString']([_0x42d706(0x57a)]);return Scene_MenuBase[_0x42d706(0x5da)][_0x42d706(0x70c)][_0x42d706(0x35f)](this);},Scene_Name[_0x4a5d62(0x5da)][_0x4a5d62(0x7f0)]=function(){const _0x1abf75=_0x4a5d62;if(this[_0x1abf75(0x92f)]()&&this[_0x1abf75(0x90a)][_0x1abf75(0x6bb)]!==_0x1abf75(0x316)){const _0x1f8ec6=VisuMZ[_0x1abf75(0x2df)][_0x1abf75(0x7d0)][_0x1abf75(0x994)];return _0x1f8ec6[_0x1abf75(0x556)]||_0x1abf75(0x75c);}return Scene_MenuBase['prototype']['buttonAssistText1']['call'](this);},Scene_Name[_0x4a5d62(0x5da)][_0x4a5d62(0x6a4)]=function(){const _0x588dc5=_0x4a5d62;if(this[_0x588dc5(0x92f)]()){const _0x595088=VisuMZ[_0x588dc5(0x2df)][_0x588dc5(0x7d0)]['KeyboardInput'];return this[_0x588dc5(0x90a)]['_mode']===_0x588dc5(0x316)?_0x595088['Keyboard']||'Keyboard':_0x595088[_0x588dc5(0x3fd)]||_0x588dc5(0x3fd);}else return Scene_MenuBase['prototype']['buttonAssistText3']['call'](this);},Scene_Name[_0x4a5d62(0x5da)]['buttonAssistText4']=function(){const _0x32d63d=_0x4a5d62;if(this[_0x32d63d(0x92f)]()){const _0x110b09=VisuMZ[_0x32d63d(0x2df)][_0x32d63d(0x7d0)][_0x32d63d(0x994)];if(this[_0x32d63d(0x90a)][_0x32d63d(0x6bb)]===_0x32d63d(0x316))return _0x110b09[_0x32d63d(0x3f9)]||_0x32d63d(0x3f9);}return Scene_MenuBase['prototype'][_0x32d63d(0x3f1)][_0x32d63d(0x35f)](this);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x335)]=Scene_Name[_0x4a5d62(0x5da)][_0x4a5d62(0x813)],Scene_Name['prototype'][_0x4a5d62(0x813)]=function(){const _0x332226=_0x4a5d62;this[_0x332226(0x51f)]()?this[_0x332226(0x87d)]():VisuMZ[_0x332226(0x2df)]['Scene_Name_onInputOk'][_0x332226(0x35f)](this);},Scene_Name[_0x4a5d62(0x5da)]['doesNameContainBannedWords']=function(){const _0x233b40=_0x4a5d62,_0xf12861=VisuMZ[_0x233b40(0x2df)][_0x233b40(0x7d0)][_0x233b40(0x994)];if(!_0xf12861)return![];const _0x55f930=_0xf12861[_0x233b40(0x7a3)];if(!_0x55f930)return![];const _0xccd943=this['_editWindow']['name']()[_0x233b40(0x545)]();for(const _0x4716a3 of _0x55f930){if(_0xccd943[_0x233b40(0x1cd)](_0x4716a3['toLowerCase']()))return!![];}return![];},Scene_Name[_0x4a5d62(0x5da)][_0x4a5d62(0x87d)]=function(){const _0x55bca1=_0x4a5d62;SoundManager[_0x55bca1(0x2a9)]();},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x43f)]=Scene_Battle[_0x4a5d62(0x5da)][_0x4a5d62(0x8fa)],Scene_Battle[_0x4a5d62(0x5da)][_0x4a5d62(0x8fa)]=function(){const _0x39e5e6=_0x4a5d62;VisuMZ[_0x39e5e6(0x2df)]['Scene_Battle_update']['call'](this);if($gameTemp['_playTestFastMode'])this[_0x39e5e6(0x42a)]();},Scene_Battle[_0x4a5d62(0x5da)][_0x4a5d62(0x42a)]=function(){const _0x55a986=_0x4a5d62;!BattleManager[_0x55a986(0x260)]()&&!this[_0x55a986(0x6ba)]&&!$gameMessage[_0x55a986(0x1fa)]()&&(this[_0x55a986(0x6ba)]=!![],this[_0x55a986(0x8fa)](),SceneManager['updateEffekseer'](),this['_playtestF7Looping']=![]);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x4e9)]=Scene_Battle[_0x4a5d62(0x5da)][_0x4a5d62(0x9a2)],Scene_Battle[_0x4a5d62(0x5da)][_0x4a5d62(0x9a2)]=function(){const _0x1ef764=_0x4a5d62;VisuMZ[_0x1ef764(0x2df)]['Scene_Battle_createCancelButton'][_0x1ef764(0x35f)](this),SceneManager[_0x1ef764(0x425)]()&&this[_0x1ef764(0x301)]();},Scene_Battle[_0x4a5d62(0x5da)][_0x4a5d62(0x301)]=function(){const _0x5d729c=_0x4a5d62;this[_0x5d729c(0x67b)]['x']=Graphics['boxWidth']+0x4,this[_0x5d729c(0x4f1)]()?this[_0x5d729c(0x67b)]['y']=Graphics[_0x5d729c(0x433)]-this[_0x5d729c(0x451)]():this['_cancelButton']['y']=0x0;},VisuMZ[_0x4a5d62(0x2df)]['Sprite_Button_initialize']=Sprite_Button[_0x4a5d62(0x5da)][_0x4a5d62(0x96b)],Sprite_Button['prototype'][_0x4a5d62(0x96b)]=function(_0x9a95a2){const _0x277d7d=_0x4a5d62;VisuMZ[_0x277d7d(0x2df)][_0x277d7d(0x51b)][_0x277d7d(0x35f)](this,_0x9a95a2),this[_0x277d7d(0x2ee)]();},Sprite_Button[_0x4a5d62(0x5da)][_0x4a5d62(0x2ee)]=function(){const _0x49456c=_0x4a5d62,_0x176a45=VisuMZ[_0x49456c(0x2df)][_0x49456c(0x7d0)]['UI'];this[_0x49456c(0x36a)]=![];switch(this[_0x49456c(0x523)]){case'cancel':this[_0x49456c(0x36a)]=!_0x176a45[_0x49456c(0x67f)];break;case'pageup':case _0x49456c(0x865):this[_0x49456c(0x36a)]=!_0x176a45['pagedownShowButton'];break;case _0x49456c(0x7bc):case'up':case'down2':case _0x49456c(0x685):case'ok':this[_0x49456c(0x36a)]=!_0x176a45[_0x49456c(0x773)];break;case'menu':this[_0x49456c(0x36a)]=!_0x176a45['menuShowButton'];break;}},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x1f8)]=Sprite_Button[_0x4a5d62(0x5da)][_0x4a5d62(0x8ad)],Sprite_Button['prototype']['updateOpacity']=function(){const _0x38511d=_0x4a5d62;SceneManager[_0x38511d(0x1db)]()||this[_0x38511d(0x36a)]?this[_0x38511d(0x41d)]():VisuMZ[_0x38511d(0x2df)][_0x38511d(0x1f8)][_0x38511d(0x35f)](this);},Sprite_Button[_0x4a5d62(0x5da)][_0x4a5d62(0x41d)]=function(){const _0xc1e0a0=_0x4a5d62;this['visible']=![],this[_0xc1e0a0(0x6f6)]=0x0,this['x']=Graphics[_0xc1e0a0(0x6e0)]*0xa,this['y']=Graphics[_0xc1e0a0(0x592)]*0xa;},VisuMZ['CoreEngine'][_0x4a5d62(0x5d6)]=Sprite_Battler['prototype'][_0x4a5d62(0x3c1)],Sprite_Battler['prototype'][_0x4a5d62(0x3c1)]=function(_0x3ccf7d,_0x345621,_0x5eb06c){const _0x5e1fe4=_0x4a5d62;(this[_0x5e1fe4(0x969)]!==_0x3ccf7d||this[_0x5e1fe4(0x429)]!==_0x345621)&&(this['setMoveEasingType'](_0x5e1fe4(0x1b6)),this['_movementWholeDuration']=_0x5eb06c),VisuMZ['CoreEngine'][_0x5e1fe4(0x5d6)]['call'](this,_0x3ccf7d,_0x345621,_0x5eb06c);},Sprite_Battler[_0x4a5d62(0x5da)][_0x4a5d62(0x5e9)]=function(_0x345ec5){const _0x5261f0=_0x4a5d62;this[_0x5261f0(0x65f)]=_0x345ec5;},Sprite_Battler['prototype'][_0x4a5d62(0x72f)]=function(){const _0x11d767=_0x4a5d62;if(this[_0x11d767(0x3c2)]<=0x0)return;const _0x2cd79c=this[_0x11d767(0x3c2)],_0x2c1e9e=this['_movementWholeDuration'],_0x5f03e8=this['_moveEasingType'];this[_0x11d767(0x762)]=this[_0x11d767(0x1bf)](this[_0x11d767(0x762)],this[_0x11d767(0x969)],_0x2cd79c,_0x2c1e9e,_0x5f03e8),this[_0x11d767(0x721)]=this[_0x11d767(0x1bf)](this[_0x11d767(0x721)],this['_targetOffsetY'],_0x2cd79c,_0x2c1e9e,_0x5f03e8),this[_0x11d767(0x3c2)]--;if(this['_movementDuration']<=0x0)this[_0x11d767(0x266)]();},Sprite_Battler[_0x4a5d62(0x5da)][_0x4a5d62(0x1bf)]=function(_0x2fc3ea,_0xc0e936,_0x397add,_0x5debbc,_0x4c445a){const _0x29bb96=_0x4a5d62,_0xe296f5=VisuMZ[_0x29bb96(0x65a)]((_0x5debbc-_0x397add)/_0x5debbc,_0x4c445a||_0x29bb96(0x1b6)),_0x215434=VisuMZ[_0x29bb96(0x65a)]((_0x5debbc-_0x397add+0x1)/_0x5debbc,_0x4c445a||_0x29bb96(0x1b6)),_0x300c61=(_0x2fc3ea-_0xc0e936*_0xe296f5)/(0x1-_0xe296f5);return _0x300c61+(_0xc0e936-_0x300c61)*_0x215434;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x41c)]=Sprite_Actor[_0x4a5d62(0x5da)][_0x4a5d62(0x3b3)],Sprite_Actor[_0x4a5d62(0x5da)]['setActorHome']=function(_0x4d1a53){const _0x20a5a7=_0x4a5d62;VisuMZ['CoreEngine'][_0x20a5a7(0x7d0)]['UI'][_0x20a5a7(0x3bb)]?this[_0x20a5a7(0x855)](_0x4d1a53):VisuMZ['CoreEngine']['Sprite_Actor_setActorHome']['call'](this,_0x4d1a53);},Sprite_Actor['prototype'][_0x4a5d62(0x855)]=function(_0x2e4e21){const _0x5d618e=_0x4a5d62;let _0x503391=Math[_0x5d618e(0x372)](Graphics[_0x5d618e(0x6e0)]/0x2+0xc0);_0x503391-=Math['floor']((Graphics[_0x5d618e(0x6e0)]-Graphics[_0x5d618e(0x943)])/0x2),_0x503391+=_0x2e4e21*0x20;let _0xeec9f6=Graphics['height']-0xc8-$gameParty[_0x5d618e(0x577)]()*0x30;_0xeec9f6-=Math[_0x5d618e(0x734)]((Graphics[_0x5d618e(0x592)]-Graphics[_0x5d618e(0x433)])/0x2),_0xeec9f6+=_0x2e4e21*0x30,this[_0x5d618e(0x7ea)](_0x503391,_0xeec9f6);},Sprite_Actor[_0x4a5d62(0x5da)][_0x4a5d62(0x82e)]=function(){const _0x17633e=_0x4a5d62;this[_0x17633e(0x3c1)](0x4b0,0x0,0x78);},Sprite_Animation[_0x4a5d62(0x5da)][_0x4a5d62(0x8db)]=function(_0x295523){const _0x67571f=_0x4a5d62;this[_0x67571f(0x98f)]=_0x295523;},VisuMZ['CoreEngine'][_0x4a5d62(0x49b)]=Sprite_Animation[_0x4a5d62(0x5da)][_0x4a5d62(0x905)],Sprite_Animation['prototype'][_0x4a5d62(0x905)]=function(){const _0x3a0e18=_0x4a5d62;if(this[_0x3a0e18(0x98f)])return;VisuMZ['CoreEngine'][_0x3a0e18(0x49b)]['call'](this);},VisuMZ[_0x4a5d62(0x2df)]['Sprite_Animation_setViewport']=Sprite_Animation[_0x4a5d62(0x5da)]['setViewport'],Sprite_Animation[_0x4a5d62(0x5da)][_0x4a5d62(0x6f7)]=function(_0x8a4405){const _0x3e73e7=_0x4a5d62;this['isAnimationOffsetXMirrored']()?this[_0x3e73e7(0x8bd)](_0x8a4405):VisuMZ['CoreEngine'][_0x3e73e7(0x738)][_0x3e73e7(0x35f)](this,_0x8a4405);},Sprite_Animation[_0x4a5d62(0x5da)][_0x4a5d62(0x535)]=function(){const _0x2854ef=_0x4a5d62;if(!this[_0x2854ef(0x520)])return![];const _0x3f43b4=this[_0x2854ef(0x520)][_0x2854ef(0x79f)]||'';if(_0x3f43b4[_0x2854ef(0x245)](/<MIRROR OFFSET X>/i))return!![];if(_0x3f43b4[_0x2854ef(0x245)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x2854ef(0x2df)][_0x2854ef(0x7d0)][_0x2854ef(0x235)][_0x2854ef(0x322)];},Sprite_Animation[_0x4a5d62(0x5da)][_0x4a5d62(0x8bd)]=function(_0x4ac113){const _0x73246a=_0x4a5d62,_0x473e2d=this['_viewportSize'],_0xf2a09d=this['_viewportSize'],_0x2666d3=this[_0x73246a(0x520)][_0x73246a(0x923)]*(this['_mirror']?-0x1:0x1)-_0x473e2d/0x2,_0x5bcd63=this['_animation'][_0x73246a(0x731)]-_0xf2a09d/0x2,_0x592259=this[_0x73246a(0x259)](_0x4ac113);_0x4ac113['gl'][_0x73246a(0x8b3)](_0x2666d3+_0x592259['x'],_0x5bcd63+_0x592259['y'],_0x473e2d,_0xf2a09d);},Sprite_Animation['prototype'][_0x4a5d62(0x453)]=function(_0x5f06b0){const _0x3eb64b=_0x4a5d62;if(_0x5f06b0[_0x3eb64b(0x669)]){}const _0x160b2f=this['_animation'][_0x3eb64b(0x79f)];let _0xc0583f=_0x5f06b0['height']*_0x5f06b0[_0x3eb64b(0x442)]['y'],_0x1647f1=0x0,_0x5b30e9=-_0xc0583f/0x2;if(_0x160b2f['match'](/<(?:HEAD|HEADER|TOP)>/i))_0x5b30e9=-_0xc0583f;if(_0x160b2f[_0x3eb64b(0x245)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x5b30e9=0x0;if(this['_animation'][_0x3eb64b(0x4de)])_0x5b30e9=0x0;if(_0x160b2f[_0x3eb64b(0x245)](/<(?:LEFT)>/i))_0x1647f1=-_0x5f06b0[_0x3eb64b(0x6e0)]/0x2;if(_0x160b2f[_0x3eb64b(0x245)](/<(?:RIGHT)>/i))_0x1647f1=_0x5f06b0[_0x3eb64b(0x6e0)]/0x2;_0x160b2f[_0x3eb64b(0x245)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x1647f1=Number(RegExp['$1'])*_0x5f06b0[_0x3eb64b(0x6e0)]);_0x160b2f['match'](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x5b30e9=(0x1-Number(RegExp['$1']))*-_0xc0583f);_0x160b2f[_0x3eb64b(0x245)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x1647f1=Number(RegExp['$1'])*_0x5f06b0[_0x3eb64b(0x6e0)],_0x5b30e9=(0x1-Number(RegExp['$2']))*-_0xc0583f);if(_0x160b2f['match'](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x1647f1+=Number(RegExp['$1']);if(_0x160b2f[_0x3eb64b(0x245)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x5b30e9+=Number(RegExp['$1']);_0x160b2f[_0x3eb64b(0x245)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x1647f1+=Number(RegExp['$1']),_0x5b30e9+=Number(RegExp['$2']));const _0x2f45de=new Point(_0x1647f1,_0x5b30e9);return _0x5f06b0['updateTransform'](),_0x5f06b0['worldTransform'][_0x3eb64b(0x2db)](_0x2f45de);},Sprite_AnimationMV[_0x4a5d62(0x5da)][_0x4a5d62(0x1b1)]=function(){const _0x5095d6=_0x4a5d62;this[_0x5095d6(0x346)]=VisuMZ[_0x5095d6(0x2df)]['Settings'][_0x5095d6(0x235)]['MvAnimationRate']??0x4,this['setupCustomRateCoreEngine'](),this[_0x5095d6(0x346)]=this[_0x5095d6(0x346)][_0x5095d6(0x95d)](0x1,0xa);},Sprite_AnimationMV[_0x4a5d62(0x5da)][_0x4a5d62(0x8c5)]=function(){const _0x1a9f45=_0x4a5d62;if(!this[_0x1a9f45(0x520)]);const _0x2f1e1e=this[_0x1a9f45(0x520)][_0x1a9f45(0x79f)]||'';_0x2f1e1e['match'](/<RATE:[ ](\d+)>/i)&&(this['_rate']=(Number(RegExp['$1'])||0x1)[_0x1a9f45(0x95d)](0x1,0xa));},Sprite_AnimationMV[_0x4a5d62(0x5da)][_0x4a5d62(0x8db)]=function(_0x11d8f2){const _0x283431=_0x4a5d62;this[_0x283431(0x98f)]=_0x11d8f2;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x71c)]=Sprite_AnimationMV[_0x4a5d62(0x5da)]['processTimingData'],Sprite_AnimationMV['prototype']['processTimingData']=function(_0x5a8eff){const _0x5d3502=_0x4a5d62;this[_0x5d3502(0x98f)]&&(_0x5a8eff=JsonEx['makeDeepCopy'](_0x5a8eff),_0x5a8eff['se']&&(_0x5a8eff['se']['volume']=0x0)),VisuMZ[_0x5d3502(0x2df)][_0x5d3502(0x71c)]['call'](this,_0x5a8eff);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x5cf)]=Sprite_AnimationMV[_0x4a5d62(0x5da)][_0x4a5d62(0x57d)],Sprite_AnimationMV['prototype'][_0x4a5d62(0x57d)]=function(){const _0xd36ddb=_0x4a5d62;VisuMZ['CoreEngine'][_0xd36ddb(0x5cf)][_0xd36ddb(0x35f)](this);if(this['_animation'][_0xd36ddb(0x2a4)]===0x3){if(this['x']===0x0)this['x']=Math['round'](Graphics[_0xd36ddb(0x6e0)]/0x2);if(this['y']===0x0)this['y']=Math[_0xd36ddb(0x372)](Graphics[_0xd36ddb(0x592)]/0x2);}},Sprite_Damage[_0x4a5d62(0x5da)]['createDigits']=function(_0x516d49){const _0x181497=_0x4a5d62;let _0x4a711b=Math[_0x181497(0x4db)](_0x516d49)['toString']();this[_0x181497(0x80c)]()&&(_0x4a711b=VisuMZ[_0x181497(0x228)](_0x4a711b));const _0x5c52ef=this[_0x181497(0x471)](),_0x637b57=Math[_0x181497(0x734)](_0x5c52ef*0.75);for(let _0x17f0f0=0x0;_0x17f0f0<_0x4a711b['length'];_0x17f0f0++){const _0x112e08=this['createChildSprite'](_0x637b57,_0x5c52ef);_0x112e08['bitmap'][_0x181497(0x59f)](_0x4a711b[_0x17f0f0],0x0,0x0,_0x637b57,_0x5c52ef,_0x181497(0x54f)),_0x112e08['x']=(_0x17f0f0-(_0x4a711b[_0x181497(0x6d1)]-0x1)/0x2)*_0x637b57,_0x112e08['dy']=-_0x17f0f0;}},Sprite_Damage[_0x4a5d62(0x5da)][_0x4a5d62(0x80c)]=function(){return VisuMZ['CoreEngine']['Settings']['QoL']['DigitGroupingDamageSprites'];},Sprite_Damage['prototype'][_0x4a5d62(0x6b2)]=function(){const _0x2b64f9=_0x4a5d62;return ColorManager[_0x2b64f9(0x856)]();},VisuMZ['CoreEngine'][_0x4a5d62(0x5c5)]=Sprite_Gauge[_0x4a5d62(0x5da)][_0x4a5d62(0x986)],Sprite_Gauge[_0x4a5d62(0x5da)][_0x4a5d62(0x986)]=function(){const _0x2dcabb=_0x4a5d62;return VisuMZ['CoreEngine'][_0x2dcabb(0x5c5)][_0x2dcabb(0x35f)](this)['clamp'](0x0,0x1);},VisuMZ['CoreEngine'][_0x4a5d62(0x2cd)]=Sprite_Gauge[_0x4a5d62(0x5da)]['currentValue'],Sprite_Gauge[_0x4a5d62(0x5da)][_0x4a5d62(0x8aa)]=function(){const _0x45968d=_0x4a5d62;let _0x3a1f5b=VisuMZ[_0x45968d(0x2df)][_0x45968d(0x2cd)][_0x45968d(0x35f)](this);return _0x3a1f5b;},Sprite_Gauge[_0x4a5d62(0x5da)][_0x4a5d62(0x78c)]=function(){const _0x174ebf=_0x4a5d62;let _0x2a8581=this['currentValue']();this['useDigitGrouping']()&&(_0x2a8581=VisuMZ[_0x174ebf(0x228)](_0x2a8581));const _0x54a57e=this[_0x174ebf(0x5b0)]()-0x1,_0x63196b=this[_0x174ebf(0x2f6)]?this['textHeight']():this[_0x174ebf(0x43a)]();this['setupValueFont'](),this['bitmap'][_0x174ebf(0x59f)](_0x2a8581,0x0,0x0,_0x54a57e,_0x63196b,'right');},Sprite_Gauge[_0x4a5d62(0x5da)][_0x4a5d62(0x2bc)]=function(){return 0x3;},Sprite_Gauge['prototype']['useDigitGrouping']=function(){const _0x2afbbf=_0x4a5d62;return VisuMZ['CoreEngine'][_0x2afbbf(0x7d0)][_0x2afbbf(0x235)][_0x2afbbf(0x2cb)];},Sprite_Gauge[_0x4a5d62(0x5da)][_0x4a5d62(0x6b2)]=function(){const _0x2ea1ad=_0x4a5d62;return ColorManager[_0x2ea1ad(0x216)]();},Sprite_StateIcon[_0x4a5d62(0x809)]=VisuMZ['CoreEngine'][_0x4a5d62(0x7d0)]['UI'][_0x4a5d62(0x649)]??!![],VisuMZ[_0x4a5d62(0x2df)]['Sprite_StateIcon_loadBitmap']=Sprite_StateIcon[_0x4a5d62(0x5da)][_0x4a5d62(0x496)],Sprite_StateIcon['prototype']['loadBitmap']=function(){const _0x252561=_0x4a5d62;Sprite_StateIcon['NON_FRAME']?this[_0x252561(0x3b1)]():VisuMZ[_0x252561(0x2df)][_0x252561(0x988)][_0x252561(0x35f)](this);},Sprite_StateIcon['prototype'][_0x4a5d62(0x3b1)]=function(){const _0x2aecad=_0x4a5d62;this['bitmap']=new Bitmap(ImageManager['iconWidth'],ImageManager[_0x2aecad(0x1f9)]),this[_0x2aecad(0x6f9)]=ImageManager[_0x2aecad(0x5bc)](_0x2aecad(0x4a4));},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x4f6)]=Sprite_StateIcon[_0x4a5d62(0x5da)][_0x4a5d62(0x8f1)],Sprite_StateIcon[_0x4a5d62(0x5da)][_0x4a5d62(0x8f1)]=function(){const _0x57955d=_0x4a5d62;Sprite_StateIcon[_0x57955d(0x809)]?this[_0x57955d(0x538)]():VisuMZ[_0x57955d(0x2df)][_0x57955d(0x4f6)][_0x57955d(0x35f)](this);},Sprite_StateIcon[_0x4a5d62(0x5da)][_0x4a5d62(0x538)]=function(){const _0x5effea=_0x4a5d62;if(this[_0x5effea(0x727)]===this[_0x5effea(0x503)])return;this['_lastIconIndex']=this['_iconIndex'];const _0x7959cd=ImageManager['iconWidth'],_0x51463a=ImageManager[_0x5effea(0x1f9)],_0x4d65c=this[_0x5effea(0x503)]%0x10*_0x7959cd,_0x361e43=Math['floor'](this['_iconIndex']/0x10)*_0x51463a,_0x279441=this[_0x5effea(0x6f9)],_0x440987=this[_0x5effea(0x757)];_0x440987[_0x5effea(0x650)](),_0x440987[_0x5effea(0x820)](_0x279441,_0x4d65c,_0x361e43,_0x7959cd,_0x51463a,0x0,0x0,_0x440987[_0x5effea(0x6e0)],_0x440987[_0x5effea(0x592)]);},VisuMZ['CoreEngine'][_0x4a5d62(0x4dc)]=Sprite_Picture['prototype'][_0x4a5d62(0x496)],Sprite_Picture[_0x4a5d62(0x5da)]['loadBitmap']=function(){const _0x1e3e71=_0x4a5d62;this[_0x1e3e71(0x1fd)]&&this['_pictureName'][_0x1e3e71(0x245)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x1e3e71(0x5f3)](Number(RegExp['$1'])):VisuMZ[_0x1e3e71(0x2df)][_0x1e3e71(0x4dc)][_0x1e3e71(0x35f)](this);},Sprite_Picture[_0x4a5d62(0x5da)]['loadIconBitmap']=function(_0x1e1e38){const _0x3e9854=_0x4a5d62,_0x21bb92=ImageManager['iconWidth'],_0x1043ba=ImageManager[_0x3e9854(0x1f9)],_0x793a79=this[_0x3e9854(0x1fd)]['match'](/SMOOTH/i);this['bitmap']=new Bitmap(_0x21bb92,_0x1043ba);const _0x1cce5a=ImageManager[_0x3e9854(0x5bc)](_0x3e9854(0x4a4)),_0x362f52=_0x1e1e38%0x10*_0x21bb92,_0x7b322a=Math[_0x3e9854(0x734)](_0x1e1e38/0x10)*_0x1043ba;this[_0x3e9854(0x757)][_0x3e9854(0x8bc)]=_0x793a79,this[_0x3e9854(0x757)][_0x3e9854(0x820)](_0x1cce5a,_0x362f52,_0x7b322a,_0x21bb92,_0x1043ba,0x0,0x0,_0x21bb92,_0x1043ba);};function Sprite_TitlePictureButton(){this['initialize'](...arguments);}Sprite_TitlePictureButton[_0x4a5d62(0x5da)]=Object[_0x4a5d62(0x963)](Sprite_Clickable['prototype']),Sprite_TitlePictureButton[_0x4a5d62(0x5da)]['constructor']=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x4a5d62(0x5da)]['initialize']=function(_0x297e44){const _0x3daf90=_0x4a5d62;Sprite_Clickable['prototype'][_0x3daf90(0x96b)][_0x3daf90(0x35f)](this),this['_data']=_0x297e44,this[_0x3daf90(0x6da)]=null,this['setup']();},Sprite_TitlePictureButton[_0x4a5d62(0x5da)][_0x4a5d62(0x684)]=function(){const _0x41e000=_0x4a5d62;this['x']=Graphics[_0x41e000(0x6e0)],this['y']=Graphics['height'],this[_0x41e000(0x27a)]=![],this[_0x41e000(0x7ae)]();},Sprite_TitlePictureButton['prototype'][_0x4a5d62(0x7ae)]=function(){const _0x1e430c=_0x4a5d62;this[_0x1e430c(0x757)]=ImageManager[_0x1e430c(0x683)](this[_0x1e430c(0x69d)]['PictureFilename']),this[_0x1e430c(0x757)]['addLoadListener'](this[_0x1e430c(0x8bf)][_0x1e430c(0x37c)](this));},Sprite_TitlePictureButton[_0x4a5d62(0x5da)][_0x4a5d62(0x8bf)]=function(){const _0x3925e4=_0x4a5d62;this['_data']['OnLoadJS'][_0x3925e4(0x35f)](this),this[_0x3925e4(0x69d)]['PositionJS']['call'](this),this[_0x3925e4(0x748)](this[_0x3925e4(0x69d)][_0x3925e4(0x1a7)][_0x3925e4(0x37c)](this));},Sprite_TitlePictureButton['prototype'][_0x4a5d62(0x8fa)]=function(){const _0x91c0c5=_0x4a5d62;Sprite_Clickable[_0x91c0c5(0x5da)]['update'][_0x91c0c5(0x35f)](this),this['updateOpacity'](),this[_0x91c0c5(0x87c)]();},Sprite_TitlePictureButton[_0x4a5d62(0x5da)][_0x4a5d62(0x8b0)]=function(){const _0x4b9e59=_0x4a5d62;return VisuMZ['CoreEngine'][_0x4b9e59(0x7d0)][_0x4b9e59(0x60c)][_0x4b9e59(0x256)][_0x4b9e59(0x54e)];},Sprite_TitlePictureButton[_0x4a5d62(0x5da)]['updateOpacity']=function(){const _0x40f989=_0x4a5d62;this[_0x40f989(0x2a8)]||this['_hovered']?this[_0x40f989(0x6f6)]=0xff:(this[_0x40f989(0x6f6)]+=this['visible']?this[_0x40f989(0x8b0)]():-0x1*this[_0x40f989(0x8b0)](),this[_0x40f989(0x6f6)]=Math[_0x40f989(0x8df)](0xc0,this[_0x40f989(0x6f6)]));},Sprite_TitlePictureButton['prototype']['setClickHandler']=function(_0x2af601){const _0x30ff5a=_0x4a5d62;this[_0x30ff5a(0x6da)]=_0x2af601;},Sprite_TitlePictureButton[_0x4a5d62(0x5da)]['onClick']=function(){const _0x4dd711=_0x4a5d62;this[_0x4dd711(0x6da)]&&this[_0x4dd711(0x6da)]();};function Sprite_ExtendedTile(){const _0x43a881=_0x4a5d62;this[_0x43a881(0x96b)](...arguments);}Sprite_ExtendedTile['prototype']=Object[_0x4a5d62(0x963)](Sprite[_0x4a5d62(0x5da)]),Sprite_ExtendedTile[_0x4a5d62(0x5da)][_0x4a5d62(0x58b)]=Sprite_ExtendedTile,Sprite_ExtendedTile[_0x4a5d62(0x5da)][_0x4a5d62(0x96b)]=function(_0x1092d2,_0x20b55e,_0x572c3a,_0x3ecd5d){const _0x4d2ac9=_0x4a5d62;this[_0x4d2ac9(0x2b4)]=Game_CharacterBase[_0x4d2ac9(0x8cd)]||-0x6,this[_0x4d2ac9(0x4b1)]=_0x1092d2,this[_0x4d2ac9(0x4e2)]=_0x20b55e,this['_tile']=_0x572c3a,this[_0x4d2ac9(0x38a)]=_0x3ecd5d,Sprite[_0x4d2ac9(0x5da)][_0x4d2ac9(0x96b)][_0x4d2ac9(0x35f)](this),this[_0x4d2ac9(0x364)](),this[_0x4d2ac9(0x56b)](),this[_0x4d2ac9(0x3e5)](),this['update']();},Sprite_ExtendedTile[_0x4a5d62(0x5da)]['createSubSprite']=function(){const _0xbfa999=_0x4a5d62;this['_tileSprite']=new Sprite(),this['_tileSprite'][_0xbfa999(0x2f8)]['x']=0.5,this[_0xbfa999(0x8a3)][_0xbfa999(0x2f8)]['y']=0x1,this[_0xbfa999(0x8a3)]['y']=-this[_0xbfa999(0x2b4)]+0x1,this[_0xbfa999(0x46e)](this[_0xbfa999(0x8a3)]);},Sprite_ExtendedTile['prototype'][_0x4a5d62(0x56b)]=function(){const _0x5ee2bc=_0x4a5d62,_0x3c86a0=$gameMap[_0x5ee2bc(0x58d)](),_0x41e7ec=0x5+Math[_0x5ee2bc(0x734)](this[_0x5ee2bc(0x92e)]/0x100);this[_0x5ee2bc(0x8a3)][_0x5ee2bc(0x757)]=ImageManager[_0x5ee2bc(0x252)](_0x3c86a0[_0x5ee2bc(0x367)][_0x41e7ec]);},Sprite_ExtendedTile['prototype'][_0x4a5d62(0x3e5)]=function(){const _0x5171a6=_0x4a5d62,_0x533a71=this[_0x5171a6(0x92e)],_0x13526f=$gameMap[_0x5171a6(0x381)](),_0x21dc30=$gameMap[_0x5171a6(0x2ad)](),_0x321353=(Math[_0x5171a6(0x734)](_0x533a71/0x80)%0x2*0x8+_0x533a71%0x8)*_0x13526f,_0x47a57f=Math['floor'](_0x533a71%0x100/0x8)%0x10*_0x21dc30,_0x363922=this['_patternHeight']*_0x21dc30;this[_0x5171a6(0x8a3)][_0x5171a6(0x19b)](_0x321353,_0x47a57f-_0x363922,_0x13526f,_0x21dc30+_0x363922);},Sprite_ExtendedTile[_0x4a5d62(0x5da)]['update']=function(){const _0x2d0a63=_0x4a5d62;Sprite['prototype'][_0x2d0a63(0x8fa)][_0x2d0a63(0x35f)](this),this[_0x2d0a63(0x57d)]();},Sprite_ExtendedTile[_0x4a5d62(0x5da)][_0x4a5d62(0x57d)]=function(){const _0x419502=_0x4a5d62,_0x7cfdc2=$gameMap[_0x419502(0x381)](),_0x257a6=$gameMap[_0x419502(0x2ad)](),_0x58eb04=this[_0x419502(0x4b1)],_0x2baec2=this['_mapY'];this['x']=Math[_0x419502(0x734)](($gameMap[_0x419502(0x2f7)](_0x58eb04)+0.5)*_0x7cfdc2),this['y']=Math[_0x419502(0x734)](($gameMap[_0x419502(0x2e2)](_0x2baec2)+0x1)*_0x257a6)+this[_0x419502(0x2b4)]-0x1;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x5dd)]=Spriteset_Base[_0x4a5d62(0x5da)]['initialize'],Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x96b)]=function(){const _0x536f9f=_0x4a5d62;VisuMZ[_0x536f9f(0x2df)][_0x536f9f(0x5dd)][_0x536f9f(0x35f)](this),this[_0x536f9f(0x55e)]();},Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x55e)]=function(){const _0x1366c7=_0x4a5d62;this['_fauxAnimationSprites']=[],this[_0x1366c7(0x7a6)]=[],this[_0x1366c7(0x594)]=this[_0x1366c7(0x442)]['x'],this[_0x1366c7(0x8dc)]=this[_0x1366c7(0x442)]['y'];},VisuMZ[_0x4a5d62(0x2df)]['Spriteset_Base_destroy']=Spriteset_Base[_0x4a5d62(0x5da)]['destroy'],Spriteset_Base[_0x4a5d62(0x5da)]['destroy']=function(_0x2112e0){const _0x12147b=_0x4a5d62;this['removeAllFauxAnimations'](),this[_0x12147b(0x524)](),VisuMZ['CoreEngine'][_0x12147b(0x53f)]['call'](this,_0x2112e0);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x62f)]=Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x8fa)],Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x8fa)]=function(){const _0x175b22=_0x4a5d62;VisuMZ[_0x175b22(0x2df)][_0x175b22(0x62f)][_0x175b22(0x35f)](this),this[_0x175b22(0x8a4)](),this[_0x175b22(0x2a7)](),this[_0x175b22(0x722)](),this[_0x175b22(0x462)]();},Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x8a4)]=function(){},Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x2a7)]=function(){const _0x5c75fe=_0x4a5d62;if(!VisuMZ[_0x5c75fe(0x2df)][_0x5c75fe(0x7d0)]['QoL'][_0x5c75fe(0x8b1)])return;if(this[_0x5c75fe(0x594)]===this['scale']['x']&&this[_0x5c75fe(0x8dc)]===this[_0x5c75fe(0x442)]['y'])return;this[_0x5c75fe(0x7aa)](),this[_0x5c75fe(0x594)]=this[_0x5c75fe(0x442)]['x'],this[_0x5c75fe(0x8dc)]=this[_0x5c75fe(0x442)]['y'];},Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x7aa)]=function(){const _0x5e8f47=_0x4a5d62;if(SceneManager[_0x5e8f47(0x89c)]()&&Spriteset_Map[_0x5e8f47(0x59c)])return;else{if(SceneManager[_0x5e8f47(0x3a2)]()&&Spriteset_Battle[_0x5e8f47(0x59c)])return;}this[_0x5e8f47(0x442)]['x']!==0x0&&(this['_pictureContainer'][_0x5e8f47(0x442)]['x']=0x1/this['scale']['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x5e8f47(0x442)]['x'])),this[_0x5e8f47(0x442)]['y']!==0x0&&(this['_pictureContainer']['scale']['y']=0x1/this[_0x5e8f47(0x442)]['y'],this[_0x5e8f47(0x1f0)]['y']=-(this['y']/this[_0x5e8f47(0x442)]['y']));},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x508)]=Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x57d)],Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x57d)]=function(){const _0x490924=_0x4a5d62;VisuMZ[_0x490924(0x2df)]['Spriteset_Base_updatePosition'][_0x490924(0x35f)](this),this[_0x490924(0x4b9)]();},Spriteset_Base['prototype'][_0x4a5d62(0x4b9)]=function(){const _0x4e3ffb=_0x4a5d62;if(!$gameScreen)return;if($gameScreen[_0x4e3ffb(0x9a8)]<=0x0)return;this['x']-=Math[_0x4e3ffb(0x372)]($gameScreen[_0x4e3ffb(0x7d1)]());const _0x1c9b45=$gameScreen[_0x4e3ffb(0x96d)]();switch($gameScreen[_0x4e3ffb(0x96d)]()){case'original':this[_0x4e3ffb(0x2be)]();break;case _0x4e3ffb(0x1c0):this[_0x4e3ffb(0x7a0)]();break;case _0x4e3ffb(0x94e):this[_0x4e3ffb(0x51c)]();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x2be)]=function(){const _0x3e263a=_0x4a5d62,_0x22c0e8=VisuMZ['CoreEngine']['Settings']['ScreenShake'];if(_0x22c0e8&&_0x22c0e8[_0x3e263a(0x509)])return _0x22c0e8[_0x3e263a(0x509)]['call'](this);this['x']+=Math[_0x3e263a(0x372)]($gameScreen['shake']());},Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x355)]=function(){const _0x545b73=_0x4a5d62,_0x258665=VisuMZ[_0x545b73(0x2df)][_0x545b73(0x7d0)][_0x545b73(0x5ca)];if(_0x258665&&_0x258665[_0x545b73(0x431)])return _0x258665['randomJS'][_0x545b73(0x35f)](this);const _0x32548f=$gameScreen[_0x545b73(0x24f)]*0.75,_0x522777=$gameScreen['_shakeSpeed']*0.6,_0x20a29d=$gameScreen[_0x545b73(0x9a8)];this['x']+=Math[_0x545b73(0x372)](Math[_0x545b73(0x60a)](_0x32548f)-Math[_0x545b73(0x60a)](_0x522777))*(Math[_0x545b73(0x8df)](_0x20a29d,0x1e)*0.5),this['y']+=Math[_0x545b73(0x372)](Math['randomInt'](_0x32548f)-Math['randomInt'](_0x522777))*(Math['min'](_0x20a29d,0x1e)*0.5);},Spriteset_Base['prototype']['updatePositionCoreEngineShakeHorz']=function(){const _0x293c14=_0x4a5d62,_0x2fc49b=VisuMZ[_0x293c14(0x2df)][_0x293c14(0x7d0)][_0x293c14(0x5ca)];if(_0x2fc49b&&_0x2fc49b[_0x293c14(0x42d)])return _0x2fc49b['horzJS'][_0x293c14(0x35f)](this);const _0x2920ff=$gameScreen[_0x293c14(0x24f)]*0.75,_0x388848=$gameScreen[_0x293c14(0x39c)]*0.6,_0xedc8ab=$gameScreen[_0x293c14(0x9a8)];this['x']+=Math['round'](Math[_0x293c14(0x60a)](_0x2920ff)-Math[_0x293c14(0x60a)](_0x388848))*(Math[_0x293c14(0x8df)](_0xedc8ab,0x1e)*0.5);},Spriteset_Base[_0x4a5d62(0x5da)]['updatePositionCoreEngineShakeVert']=function(){const _0x1d549b=_0x4a5d62,_0x376f17=VisuMZ[_0x1d549b(0x2df)][_0x1d549b(0x7d0)][_0x1d549b(0x5ca)];if(_0x376f17&&_0x376f17[_0x1d549b(0x5e4)])return _0x376f17[_0x1d549b(0x5e4)]['call'](this);const _0x557961=$gameScreen[_0x1d549b(0x24f)]*0.75,_0x1eac71=$gameScreen['_shakeSpeed']*0.6,_0x480e33=$gameScreen[_0x1d549b(0x9a8)];this['y']+=Math[_0x1d549b(0x372)](Math[_0x1d549b(0x60a)](_0x557961)-Math[_0x1d549b(0x60a)](_0x1eac71))*(Math[_0x1d549b(0x8df)](_0x480e33,0x1e)*0.5);},Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x722)]=function(){const _0x3f8574=_0x4a5d62;for(const _0x2b7200 of this[_0x3f8574(0x31f)]){!_0x2b7200['isPlaying']()&&this[_0x3f8574(0x676)](_0x2b7200);}this[_0x3f8574(0x62d)]();},Spriteset_Base[_0x4a5d62(0x5da)]['processFauxAnimationRequests']=function(){const _0x317ecf=_0x4a5d62;for(;;){const _0x14080d=$gameTemp['retrieveFauxAnimation']();if(_0x14080d)this[_0x317ecf(0x6dc)](_0x14080d);else break;}},Spriteset_Base['prototype']['createFauxAnimation']=function(_0x285550){const _0x4452e0=_0x4a5d62,_0x4e89ee=$dataAnimations[_0x285550[_0x4452e0(0x3ca)]],_0x5965a6=_0x285550[_0x4452e0(0x766)],_0x57be9e=_0x285550['mirror'],_0x1d57c6=_0x285550[_0x4452e0(0x981)];let _0x243c9e=this[_0x4452e0(0x5b9)]();const _0x3296b4=this[_0x4452e0(0x3d2)]();if(this[_0x4452e0(0x5f6)](_0x4e89ee))for(const _0x100a4b of _0x5965a6){this[_0x4452e0(0x1c8)]([_0x100a4b],_0x4e89ee,_0x57be9e,_0x243c9e,_0x1d57c6),_0x243c9e+=_0x3296b4;}else this[_0x4452e0(0x1c8)](_0x5965a6,_0x4e89ee,_0x57be9e,_0x243c9e,_0x1d57c6);},Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x902)]=function(_0x94ffce,_0x58ea07,_0x19a767,_0x11e84f){const _0x20cec1=_0x4a5d62,_0x528e81=this[_0x20cec1(0x4bf)](_0x58ea07),_0x1a2eec=new(_0x528e81?Sprite_AnimationMV:Sprite_Animation)(),_0x5d3365=this[_0x20cec1(0x95c)](_0x94ffce),_0x46266e=this['animationBaseDelay'](),_0x3fc531=_0x11e84f>_0x46266e?this[_0x20cec1(0x764)]():null;this['animationShouldMirror'](_0x94ffce[0x0])&&(_0x19a767=!_0x19a767),_0x1a2eec['targetObjects']=_0x94ffce,_0x1a2eec[_0x20cec1(0x684)](_0x5d3365,_0x58ea07,_0x19a767,_0x11e84f,_0x3fc531),this[_0x20cec1(0x769)](_0x1a2eec),this['_animationSprites'][_0x20cec1(0x98c)](_0x1a2eec);},Spriteset_Base[_0x4a5d62(0x5da)]['createFauxAnimationSprite']=function(_0x5b5981,_0x2774fb,_0x4dcf77,_0x2fb8aa,_0x2cb241){const _0x574006=_0x4a5d62,_0x4044a5=this[_0x574006(0x4bf)](_0x2774fb),_0x39d47e=new(_0x4044a5?Sprite_AnimationMV:Sprite_Animation)(),_0x23e1d3=this[_0x574006(0x95c)](_0x5b5981);this['animationShouldMirror'](_0x5b5981[0x0])&&(_0x4dcf77=!_0x4dcf77);_0x39d47e[_0x574006(0x2da)]=_0x5b5981,_0x39d47e[_0x574006(0x684)](_0x23e1d3,_0x2774fb,_0x4dcf77,_0x2fb8aa),_0x39d47e['setMute'](_0x2cb241),this[_0x574006(0x769)](_0x39d47e);if(this[_0x574006(0x293)])this[_0x574006(0x293)][_0x574006(0x39a)](_0x39d47e);this['_fauxAnimationSprites'][_0x574006(0x98c)](_0x39d47e);},Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x769)]=function(_0x55e890){const _0x35a98e=_0x4a5d62;this[_0x35a98e(0x945)][_0x35a98e(0x46e)](_0x55e890);},Spriteset_Base[_0x4a5d62(0x5da)]['removeAnimation']=function(_0x58af42){const _0x1cd055=_0x4a5d62;this[_0x1cd055(0x293)][_0x1cd055(0x39a)](_0x58af42),this[_0x1cd055(0x470)](_0x58af42);for(const _0x420674 of _0x58af42[_0x1cd055(0x2da)]){_0x420674[_0x1cd055(0x390)]&&_0x420674[_0x1cd055(0x390)]();}_0x58af42[_0x1cd055(0x880)]();},Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x676)]=function(_0x465b1){const _0x4150c5=_0x4a5d62;this[_0x4150c5(0x31f)][_0x4150c5(0x39a)](_0x465b1),this[_0x4150c5(0x470)](_0x465b1);for(const _0x1196ac of _0x465b1[_0x4150c5(0x2da)]){_0x1196ac['endAnimation']&&_0x1196ac[_0x4150c5(0x390)]();}_0x465b1[_0x4150c5(0x880)]();},Spriteset_Base['prototype']['removeAnimationFromContainer']=function(_0x5bc73b){const _0x1b5546=_0x4a5d62;this[_0x1b5546(0x945)][_0x1b5546(0x631)](_0x5bc73b);},Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x48c)]=function(){const _0xb5af1d=_0x4a5d62;for(const _0xb37b78 of this[_0xb5af1d(0x31f)]){this['removeFauxAnimation'](_0xb37b78);}},Spriteset_Base[_0x4a5d62(0x5da)]['isFauxAnimationPlaying']=function(){const _0x126ea0=_0x4a5d62;return this[_0x126ea0(0x31f)][_0x126ea0(0x6d1)]>0x0;},Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x462)]=function(){const _0x7c9e1b=_0x4a5d62;for(const _0x470665 of this[_0x7c9e1b(0x7a6)]){!_0x470665['isPlaying']()&&this[_0x7c9e1b(0x3dc)](_0x470665);}this[_0x7c9e1b(0x204)]();},Spriteset_Base['prototype'][_0x4a5d62(0x204)]=function(){const _0x365b4c=_0x4a5d62;for(;;){const _0xc14bee=$gameTemp[_0x365b4c(0x7da)]();if(_0xc14bee)this['createPointAnimation'](_0xc14bee);else break;}},Spriteset_Base[_0x4a5d62(0x5da)]['createPointAnimation']=function(_0x1c9492){const _0x49a2de=_0x4a5d62,_0x18c550=$dataAnimations[_0x1c9492['animationId']],_0x4503b2=this[_0x49a2de(0x350)](_0x1c9492),_0x202288=_0x1c9492['mirror'],_0x4023ac=_0x1c9492[_0x49a2de(0x981)];let _0x60a01c=this['animationBaseDelay']();const _0x1835ef=this['animationNextDelay']();if(this[_0x49a2de(0x5f6)](_0x18c550))for(const _0x3e31e3 of _0x4503b2){this[_0x49a2de(0x443)]([_0x3e31e3],_0x18c550,_0x202288,_0x60a01c,_0x4023ac),_0x60a01c+=_0x1835ef;}else this[_0x49a2de(0x443)](_0x4503b2,_0x18c550,_0x202288,_0x60a01c,_0x4023ac);},Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x350)]=function(_0xf4e3c6){const _0x346487=_0x4a5d62,_0x5051f4=new Sprite_Clickable(),_0x15546d=this[_0x346487(0x55a)]();_0x5051f4['x']=_0xf4e3c6['x']-_0x15546d['x'],_0x5051f4['y']=_0xf4e3c6['y']-_0x15546d['y'],_0x5051f4['z']=0x64;const _0x4fbde7=this['getPointAnimationLayer']();return _0x4fbde7[_0x346487(0x46e)](_0x5051f4),[_0x5051f4];},Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x55a)]=function(){return this;},Spriteset_Map[_0x4a5d62(0x5da)]['getPointAnimationLayer']=function(){const _0x39d977=_0x4a5d62;return this[_0x39d977(0x2c4)]||this;},Spriteset_Battle[_0x4a5d62(0x5da)][_0x4a5d62(0x55a)]=function(){const _0x43638d=_0x4a5d62;return this[_0x43638d(0x63b)]||this;},Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x443)]=function(_0x433648,_0x754854,_0x483bc4,_0x135af4,_0xe49031){const _0x1b980f=_0x4a5d62,_0x215dcc=this[_0x1b980f(0x4bf)](_0x754854),_0x37ed05=new(_0x215dcc?Sprite_AnimationMV:Sprite_Animation)();_0x37ed05[_0x1b980f(0x2da)]=_0x433648,_0x37ed05['setup'](_0x433648,_0x754854,_0x483bc4,_0x135af4),_0x37ed05[_0x1b980f(0x8db)](_0xe49031),this[_0x1b980f(0x769)](_0x37ed05),this[_0x1b980f(0x7a6)]['push'](_0x37ed05);},Spriteset_Base['prototype'][_0x4a5d62(0x3dc)]=function(_0x35b6ea){const _0x2078d1=_0x4a5d62;this[_0x2078d1(0x7a6)]['remove'](_0x35b6ea),this[_0x2078d1(0x945)][_0x2078d1(0x631)](_0x35b6ea);for(const _0x20183b of _0x35b6ea['targetObjects']){_0x20183b[_0x2078d1(0x390)]&&_0x20183b['endAnimation']();const _0x51c7ca=this[_0x2078d1(0x55a)]();if(_0x51c7ca)_0x51c7ca[_0x2078d1(0x631)](_0x20183b);}_0x35b6ea[_0x2078d1(0x880)]();},Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x524)]=function(){const _0x564288=_0x4a5d62;for(const _0x5b5439 of this['_pointAnimationSprites']){this[_0x564288(0x3dc)](_0x5b5439);}},Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x694)]=function(){const _0x2ac651=_0x4a5d62;return this[_0x2ac651(0x7a6)][_0x2ac651(0x6d1)]>0x0;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x516)]=Spriteset_Base['prototype']['isAnimationPlaying'],Spriteset_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x395)]=function(){const _0x12831e=_0x4a5d62;return VisuMZ[_0x12831e(0x2df)]['Spriteset_Base_isAnimationPlaying']['call'](this)||this[_0x12831e(0x694)]();},Spriteset_Map[_0x4a5d62(0x59c)]=VisuMZ['CoreEngine'][_0x4a5d62(0x7d0)][_0x4a5d62(0x235)][_0x4a5d62(0x703)]||![],VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x5c8)]=Scene_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x63d)],Scene_Map['prototype']['createSpriteset']=function(){const _0x2667bb=_0x4a5d62;VisuMZ[_0x2667bb(0x2df)][_0x2667bb(0x5c8)][_0x2667bb(0x35f)](this);if(!Spriteset_Map['DETACH_PICTURE_CONTAINER'])return;const _0x3ba191=this['_spriteset'];if(!_0x3ba191)return;this[_0x2667bb(0x1f0)]=_0x3ba191['_pictureContainer'];if(!this[_0x2667bb(0x1f0)])return;this[_0x2667bb(0x46e)](this[_0x2667bb(0x1f0)]);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x885)]=Spriteset_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x71f)],Spriteset_Map[_0x4a5d62(0x5da)]['createTilemap']=function(){const _0x2c6535=_0x4a5d62;VisuMZ[_0x2c6535(0x2df)]['Spriteset_Map_createTilemap'][_0x2c6535(0x35f)](this),this['createTileExtendSprites']();},Spriteset_Map[_0x4a5d62(0x5da)]['createTileExtendSprites']=function(){const _0x27ca51=_0x4a5d62,_0x139073=$gameMap['tileset']();if(!_0x139073)return;const _0x4d992b=$gameMap['getTileExtendTerrainTags']();if(Object[_0x27ca51(0x62a)](_0x4d992b)[_0x27ca51(0x6d1)]<=0x0)return;const _0x34373e=$gameMap[_0x27ca51(0x1ba)]();this[_0x27ca51(0x2d2)]=this['_tileExtendSprites']||[];for(let _0xa9d22f=0x0;_0xa9d22f<$gameMap[_0x27ca51(0x592)]();_0xa9d22f++){for(let _0x50e2a5=0x0;_0x50e2a5<$gameMap['width']();_0x50e2a5++){for(const _0x597ad1 of $gameMap['layeredTiles'](_0x50e2a5,_0xa9d22f)){const _0x595fb2=_0x34373e[_0x597ad1]>>0xc,_0x4b32db=_0x4d992b[_0x595fb2]||0x0;if(_0x4b32db<=0x0)continue;this['createExtendedTileSprite'](_0x50e2a5,_0xa9d22f,_0x597ad1,_0x4b32db);}}}},Spriteset_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x5ee)]=function(){const _0x1e307a=_0x4a5d62;this[_0x1e307a(0x2d2)]=this[_0x1e307a(0x2d2)]||[];for(const _0x20388c of this[_0x1e307a(0x2d2)]){this[_0x1e307a(0x2c4)]['removeChild'](_0x20388c);}this[_0x1e307a(0x2d2)]=[];},Spriteset_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x32c)]=function(_0x232442,_0x31f112,_0x4ec802,_0x50725c){const _0x5d7651=_0x4a5d62,_0x23c4c3=new Sprite_ExtendedTile(_0x232442,_0x31f112,_0x4ec802,_0x50725c),_0xfd481e=$gameMap['tilesetFlags']();_0xfd481e[_0x4ec802]&0x10?_0x23c4c3['z']=0x4:_0x23c4c3['z']=0x3,this[_0x5d7651(0x2c4)][_0x5d7651(0x46e)](_0x23c4c3),this[_0x5d7651(0x2d2)][_0x5d7651(0x98c)](_0x23c4c3);},VisuMZ['CoreEngine']['Tilemap_addSpotTile']=Tilemap['prototype'][_0x4a5d62(0x456)],Tilemap[_0x4a5d62(0x5da)]['_addSpotTile']=function(_0x42c1e7,_0x55ec49,_0x50abf6){const _0x3132d5=_0x4a5d62;if($gameMap[_0x3132d5(0x277)](_0x42c1e7))return;VisuMZ['CoreEngine'][_0x3132d5(0x19e)][_0x3132d5(0x35f)](this,_0x42c1e7,_0x55ec49,_0x50abf6);},Spriteset_Battle[_0x4a5d62(0x59c)]=VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x7d0)][_0x4a5d62(0x235)][_0x4a5d62(0x342)]||![],VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x37a)]=Scene_Battle[_0x4a5d62(0x5da)][_0x4a5d62(0x63d)],Scene_Battle[_0x4a5d62(0x5da)][_0x4a5d62(0x63d)]=function(){const _0x4c3b9b=_0x4a5d62;VisuMZ['CoreEngine'][_0x4c3b9b(0x37a)][_0x4c3b9b(0x35f)](this);if(!Spriteset_Battle['DETACH_PICTURE_CONTAINER'])return;const _0x5ce39e=this[_0x4c3b9b(0x5f4)];if(!_0x5ce39e)return;this[_0x4c3b9b(0x1f0)]=_0x5ce39e['_pictureContainer'];if(!this[_0x4c3b9b(0x1f0)])return;this['addChild'](this['_pictureContainer']);},Spriteset_Battle[_0x4a5d62(0x5da)][_0x4a5d62(0x7a4)]=function(){const _0x78dc5c=_0x4a5d62;this[_0x78dc5c(0x7b5)]=new PIXI[(_0x78dc5c(0x7b7))][(_0x78dc5c(0x97a))](clamp=!![]),this[_0x78dc5c(0x886)]=new Sprite(),this[_0x78dc5c(0x886)][_0x78dc5c(0x757)]=SceneManager[_0x78dc5c(0x27e)](),this[_0x78dc5c(0x886)][_0x78dc5c(0x7b7)]=[this[_0x78dc5c(0x7b5)]],this['_baseSprite'][_0x78dc5c(0x46e)](this[_0x78dc5c(0x886)]);},VisuMZ['CoreEngine'][_0x4a5d62(0x4cf)]=Spriteset_Battle[_0x4a5d62(0x5da)][_0x4a5d62(0x8a6)],Spriteset_Battle[_0x4a5d62(0x5da)][_0x4a5d62(0x8a6)]=function(){const _0x1cec43=_0x4a5d62;this[_0x1cec43(0x578)]()&&this[_0x1cec43(0x50f)](),VisuMZ['CoreEngine'][_0x1cec43(0x4cf)]['call'](this);},VisuMZ['CoreEngine'][_0x4a5d62(0x352)]=Spriteset_Battle[_0x4a5d62(0x5da)][_0x4a5d62(0x70a)],Spriteset_Battle[_0x4a5d62(0x5da)][_0x4a5d62(0x70a)]=function(){const _0x11a4e4=_0x4a5d62;VisuMZ[_0x11a4e4(0x2df)]['Spriteset_Battle_createLowerLayer'][_0x11a4e4(0x35f)](this),this['_battleField']&&this[_0x11a4e4(0x63b)][_0x11a4e4(0x8fa)]();},Spriteset_Battle[_0x4a5d62(0x5da)][_0x4a5d62(0x578)]=function(){const _0x3d092f=_0x4a5d62,_0x1b1d34=VisuMZ['CoreEngine'][_0x3d092f(0x7d0)][_0x3d092f(0x210)];if(!_0x1b1d34)return![];if(Utils[_0x3d092f(0x6cb)]>='1.3.0'&&!_0x1b1d34[_0x3d092f(0x8f0)])return![];if(Utils[_0x3d092f(0x6cb)]>='1.10.0'&&!_0x1b1d34[_0x3d092f(0x8f0)])return![];return _0x1b1d34[_0x3d092f(0x4c2)];},Spriteset_Battle[_0x4a5d62(0x5da)]['repositionEnemiesByResolution']=function(){const _0x214428=_0x4a5d62;for(member of $gameTroop[_0x214428(0x7b1)]()){member[_0x214428(0x2e7)]();}},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x824)]=Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x96b)],Window_Base['prototype'][_0x4a5d62(0x96b)]=function(_0x554200){const _0x30262b=_0x4a5d62;_0x554200['x']=Math[_0x30262b(0x372)](_0x554200['x']),_0x554200['y']=Math['round'](_0x554200['y']),_0x554200[_0x30262b(0x6e0)]=Math[_0x30262b(0x372)](_0x554200[_0x30262b(0x6e0)]),_0x554200[_0x30262b(0x592)]=Math['round'](_0x554200[_0x30262b(0x592)]),this[_0x30262b(0x218)](),VisuMZ[_0x30262b(0x2df)][_0x30262b(0x824)][_0x30262b(0x35f)](this,_0x554200),this[_0x30262b(0x3b5)]();},Window_Base[_0x4a5d62(0x5da)]['initDigitGrouping']=function(){const _0x44c9bc=_0x4a5d62;this[_0x44c9bc(0x861)]=VisuMZ[_0x44c9bc(0x2df)][_0x44c9bc(0x7d0)]['QoL'][_0x44c9bc(0x1ca)],this[_0x44c9bc(0x99d)]=VisuMZ[_0x44c9bc(0x2df)][_0x44c9bc(0x7d0)]['QoL'][_0x44c9bc(0x852)];},Window_Base[_0x4a5d62(0x5da)]['lineHeight']=function(){const _0x4e8cb4=_0x4a5d62;return VisuMZ[_0x4e8cb4(0x2df)][_0x4e8cb4(0x7d0)][_0x4e8cb4(0x464)]['LineHeight'];},Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x74e)]=function(){const _0x158d4d=_0x4a5d62;return VisuMZ['CoreEngine'][_0x158d4d(0x7d0)][_0x158d4d(0x464)][_0x158d4d(0x1b9)];},Window_Base['prototype'][_0x4a5d62(0x85e)]=function(){const _0x2a6cca=_0x4a5d62;$gameSystem[_0x2a6cca(0x26b)]&&$dataSystem[_0x2a6cca(0x897)][_0x2a6cca(0x26b)]!==undefined?this[_0x2a6cca(0x1ec)]=$gameSystem[_0x2a6cca(0x26b)]():this[_0x2a6cca(0x1ec)]=VisuMZ[_0x2a6cca(0x2df)]['Settings'][_0x2a6cca(0x464)][_0x2a6cca(0x1e5)];},Window_Base[_0x4a5d62(0x5da)]['translucentOpacity']=function(){const _0x1200a7=_0x4a5d62;return VisuMZ[_0x1200a7(0x2df)][_0x1200a7(0x7d0)]['Window']['TranslucentOpacity'];},Window_Base['prototype']['openingSpeed']=function(){const _0x544364=_0x4a5d62;return VisuMZ[_0x544364(0x2df)][_0x544364(0x7d0)][_0x544364(0x464)]['OpenSpeed'];},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x29b)]=Window_Base['prototype'][_0x4a5d62(0x8fa)],Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x8fa)]=function(){const _0x54b4dd=_0x4a5d62;VisuMZ[_0x54b4dd(0x2df)]['Window_Base_update']['call'](this),this['updateCoreEasing']();},Window_Base['prototype'][_0x4a5d62(0x827)]=function(){const _0x2eb72c=_0x4a5d62;this[_0x2eb72c(0x93f)]&&(this[_0x2eb72c(0x699)]+=this['openingSpeed'](),this[_0x2eb72c(0x2d7)]()&&(this[_0x2eb72c(0x93f)]=![]));},Window_Base['prototype'][_0x4a5d62(0x55c)]=function(){const _0x5ef3c9=_0x4a5d62;this[_0x5ef3c9(0x5ae)]&&(this[_0x5ef3c9(0x699)]-=this['openingSpeed'](),this[_0x5ef3c9(0x2ae)]()&&(this['_closing']=![]));},VisuMZ['CoreEngine']['Window_Base_drawText']=Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x59f)],Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x59f)]=function(_0x3ff249,_0x4f5db6,_0x4c7e3c,_0x730cd5,_0x5b53bb){const _0x2152fd=_0x4a5d62;if(this['useDigitGrouping']())_0x3ff249=VisuMZ[_0x2152fd(0x228)](_0x3ff249);VisuMZ['CoreEngine']['Window_Base_drawText'][_0x2152fd(0x35f)](this,_0x3ff249,_0x4f5db6,_0x4c7e3c,_0x730cd5,_0x5b53bb);},Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x80c)]=function(){const _0x558986=_0x4a5d62;return this[_0x558986(0x861)];},VisuMZ[_0x4a5d62(0x2df)]['Window_Base_createTextState']=Window_Base['prototype']['createTextState'],Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x214)]=function(_0x1a737b,_0x23ce51,_0x5cca42,_0x312295){const _0x4d06f3=_0x4a5d62;var _0x21f26e=VisuMZ[_0x4d06f3(0x2df)][_0x4d06f3(0x3f4)][_0x4d06f3(0x35f)](this,_0x1a737b,_0x23ce51,_0x5cca42,_0x312295);if(this['useDigitGroupingEx']())_0x21f26e['text']=String(VisuMZ[_0x4d06f3(0x228)](_0x21f26e[_0x4d06f3(0x7d4)]))||'';return _0x21f26e;},Window_Base['prototype'][_0x4a5d62(0x617)]=function(){const _0x9a5c81=_0x4a5d62;return this[_0x9a5c81(0x99d)];},Window_Base['prototype'][_0x4a5d62(0x3e4)]=function(_0x5c5783){const _0x4453dd=_0x4a5d62;this[_0x4453dd(0x861)]=_0x5c5783;},Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x8cc)]=function(_0x4cc31d){const _0x37be5f=_0x4a5d62;this[_0x37be5f(0x99d)]=_0x4cc31d;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x6a6)]=Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x20e)],Window_Base['prototype'][_0x4a5d62(0x20e)]=function(_0x137571,_0x4ebeef,_0x365e67){const _0x3e9602=_0x4a5d62;_0x4ebeef=Math[_0x3e9602(0x372)](_0x4ebeef),_0x365e67=Math[_0x3e9602(0x372)](_0x365e67),VisuMZ[_0x3e9602(0x2df)]['Window_Base_drawIcon'][_0x3e9602(0x35f)](this,_0x137571,_0x4ebeef,_0x365e67);},VisuMZ[_0x4a5d62(0x2df)]['Window_Base_drawFace']=Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x911)],Window_Base['prototype'][_0x4a5d62(0x911)]=function(_0x194d5d,_0x318460,_0x365106,_0x4fa3de,_0xd2dd16,_0x32040a){const _0x15376f=_0x4a5d62;_0xd2dd16=_0xd2dd16||ImageManager[_0x15376f(0x76e)],_0x32040a=_0x32040a||ImageManager[_0x15376f(0x484)],_0x365106=Math[_0x15376f(0x372)](_0x365106),_0x4fa3de=Math[_0x15376f(0x372)](_0x4fa3de),_0xd2dd16=Math[_0x15376f(0x372)](_0xd2dd16),_0x32040a=Math[_0x15376f(0x372)](_0x32040a),VisuMZ[_0x15376f(0x2df)][_0x15376f(0x996)][_0x15376f(0x35f)](this,_0x194d5d,_0x318460,_0x365106,_0x4fa3de,_0xd2dd16,_0x32040a);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x5df)]=Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x497)],Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x497)]=function(_0x47646a,_0x15e7bf,_0x225f28,_0x2d1306){const _0x5be266=_0x4a5d62;_0x225f28=Math[_0x5be266(0x372)](_0x225f28),_0x2d1306=Math[_0x5be266(0x372)](_0x2d1306),VisuMZ[_0x5be266(0x2df)]['Window_Base_drawCharacter'][_0x5be266(0x35f)](this,_0x47646a,_0x15e7bf,_0x225f28,_0x2d1306);},VisuMZ[_0x4a5d62(0x2df)]['Window_Selectable_itemRect']=Window_Selectable[_0x4a5d62(0x5da)]['itemRect'],Window_Selectable[_0x4a5d62(0x5da)][_0x4a5d62(0x4fe)]=function(_0x23e8fb){const _0x2c5d4b=_0x4a5d62;let _0x55ceb5=VisuMZ['CoreEngine']['Window_Selectable_itemRect'][_0x2c5d4b(0x35f)](this,_0x23e8fb);return _0x55ceb5['x']=Math['round'](_0x55ceb5['x']),_0x55ceb5['y']=Math[_0x2c5d4b(0x372)](_0x55ceb5['y']),_0x55ceb5[_0x2c5d4b(0x6e0)]=Math[_0x2c5d4b(0x372)](_0x55ceb5['width']),_0x55ceb5['height']=Math[_0x2c5d4b(0x372)](_0x55ceb5['height']),_0x55ceb5;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x860)]=Window_StatusBase[_0x4a5d62(0x5da)][_0x4a5d62(0x1a2)],Window_StatusBase[_0x4a5d62(0x5da)]['drawActorSimpleStatus']=function(_0x5d9b03,_0x445826,_0x23e402){const _0x333187=_0x4a5d62;_0x445826=Math[_0x333187(0x372)](_0x445826),_0x23e402=Math[_0x333187(0x372)](_0x23e402),VisuMZ[_0x333187(0x2df)]['Window_StatusBase_drawActorSimpleStatus'][_0x333187(0x35f)](this,_0x5d9b03,_0x445826,_0x23e402);},Window_Base[_0x4a5d62(0x5da)]['initCoreEasing']=function(){const _0x58e7bc=_0x4a5d62;this['_coreEasing']={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x58e7bc(0x442)]['x'],'targetScaleY':this[_0x58e7bc(0x442)]['y'],'targetOpacity':this[_0x58e7bc(0x6f6)],'targetBackOpacity':this[_0x58e7bc(0x1ec)],'targetContentsOpacity':this[_0x58e7bc(0x72e)]};},Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x8bb)]=function(){const _0x352e00=_0x4a5d62;if(!this[_0x352e00(0x5e6)])return;if(this[_0x352e00(0x5e6)][_0x352e00(0x715)]<=0x0)return;this['x']=this[_0x352e00(0x5dc)](this['x'],this[_0x352e00(0x5e6)][_0x352e00(0x410)]),this['y']=this[_0x352e00(0x5dc)](this['y'],this[_0x352e00(0x5e6)][_0x352e00(0x262)]),this[_0x352e00(0x442)]['x']=this[_0x352e00(0x5dc)](this[_0x352e00(0x442)]['x'],this[_0x352e00(0x5e6)][_0x352e00(0x4d0)]),this[_0x352e00(0x442)]['y']=this[_0x352e00(0x5dc)](this['scale']['y'],this[_0x352e00(0x5e6)]['targetScaleY']),this[_0x352e00(0x6f6)]=this[_0x352e00(0x5dc)](this[_0x352e00(0x6f6)],this['_coreEasing'][_0x352e00(0x822)]),this['backOpacity']=this['applyCoreEasing'](this[_0x352e00(0x1ec)],this[_0x352e00(0x5e6)][_0x352e00(0x2b2)]),this[_0x352e00(0x72e)]=this['applyCoreEasing'](this[_0x352e00(0x72e)],this[_0x352e00(0x5e6)]['targetContentsOpacity']),this[_0x352e00(0x5e6)][_0x352e00(0x715)]--;},Window_Base['prototype'][_0x4a5d62(0x5dc)]=function(_0x24953a,_0x2012e3){const _0xc1689c=_0x4a5d62;if(!this['_coreEasing'])return _0x2012e3;const _0x283c52=this['_coreEasing'][_0xc1689c(0x715)],_0x13a489=this[_0xc1689c(0x5e6)][_0xc1689c(0x359)],_0x3bc34d=this[_0xc1689c(0x29a)]((_0x13a489-_0x283c52)/_0x13a489),_0x514bab=this['calcCoreEasing']((_0x13a489-_0x283c52+0x1)/_0x13a489),_0x18c9b2=(_0x24953a-_0x2012e3*_0x3bc34d)/(0x1-_0x3bc34d);return _0x18c9b2+(_0x2012e3-_0x18c9b2)*_0x514bab;},Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x29a)]=function(_0x29ccd7){const _0x3ffc88=_0x4a5d62;if(!this[_0x3ffc88(0x5e6)])return _0x29ccd7;return VisuMZ[_0x3ffc88(0x65a)](_0x29ccd7,this[_0x3ffc88(0x5e6)][_0x3ffc88(0x2b8)]||_0x3ffc88(0x3f0));},Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x225)]=function(_0x4305b7,_0x110816){const _0x51b70f=_0x4a5d62;if(!this[_0x51b70f(0x5e6)])return;this['x']=this['_coreEasing'][_0x51b70f(0x410)],this['y']=this[_0x51b70f(0x5e6)][_0x51b70f(0x262)],this[_0x51b70f(0x442)]['x']=this['_coreEasing'][_0x51b70f(0x4d0)],this[_0x51b70f(0x442)]['y']=this[_0x51b70f(0x5e6)][_0x51b70f(0x540)],this[_0x51b70f(0x6f6)]=this[_0x51b70f(0x5e6)][_0x51b70f(0x822)],this[_0x51b70f(0x1ec)]=this[_0x51b70f(0x5e6)][_0x51b70f(0x2b2)],this[_0x51b70f(0x72e)]=this[_0x51b70f(0x5e6)]['targetContentsOpacity'],this['setupCoreEasing'](_0x4305b7,_0x110816,this['x'],this['y'],this[_0x51b70f(0x442)]['x'],this[_0x51b70f(0x442)]['y'],this[_0x51b70f(0x6f6)],this[_0x51b70f(0x1ec)],this[_0x51b70f(0x72e)]);},Window_Base[_0x4a5d62(0x5da)]['setupCoreEasing']=function(_0x3436cb,_0x4adc70,_0x417cd7,_0x37ca4c,_0x5b8f1d,_0x2e2197,_0xfe961,_0xdda03,_0x1b4d32){const _0x32f3fb=_0x4a5d62;this[_0x32f3fb(0x5e6)]={'duration':_0x3436cb,'wholeDuration':_0x3436cb,'type':_0x4adc70,'targetX':_0x417cd7,'targetY':_0x37ca4c,'targetScaleX':_0x5b8f1d,'targetScaleY':_0x2e2197,'targetOpacity':_0xfe961,'targetBackOpacity':_0xdda03,'targetContentsOpacity':_0x1b4d32};},Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x651)]=function(_0x2bd7be,_0x157a9c,_0x54a38e,_0x25947f,_0x1053ef){const _0x2c3e24=_0x4a5d62;this[_0x2c3e24(0x209)](),this['contents']['fontSize']=VisuMZ[_0x2c3e24(0x2df)][_0x2c3e24(0x7d0)][_0x2c3e24(0x66a)][_0x2c3e24(0x985)];const _0x503edf=VisuMZ[_0x2c3e24(0x2df)][_0x2c3e24(0x7d0)]['Gold'][_0x2c3e24(0x2c0)];if(_0x503edf>0x0&&_0x157a9c===TextManager[_0x2c3e24(0x385)]){const _0x446a1f=_0x25947f+(this[_0x2c3e24(0x3aa)]()-ImageManager[_0x2c3e24(0x1f9)])/0x2;this[_0x2c3e24(0x20e)](_0x503edf,_0x54a38e+(_0x1053ef-ImageManager['iconWidth']),_0x446a1f),_0x1053ef-=ImageManager[_0x2c3e24(0x285)]+0x4;}else this[_0x2c3e24(0x270)](ColorManager['systemColor']()),this[_0x2c3e24(0x59f)](_0x157a9c,_0x54a38e,_0x25947f,_0x1053ef,'right'),_0x1053ef-=this['textWidth'](_0x157a9c)+0x6;this[_0x2c3e24(0x3f7)]();const _0x41443c=this[_0x2c3e24(0x67a)](this[_0x2c3e24(0x861)]?VisuMZ[_0x2c3e24(0x228)](_0x2bd7be):_0x2bd7be),_0x2ff65b=VisuMZ[_0x2c3e24(0x2df)][_0x2c3e24(0x7d0)]['Gold'][_0x2c3e24(0x1e6)][_0x2c3e24(0x5d4)]();_0x41443c>_0x1053ef&&_0x2ff65b!==''?this[_0x2c3e24(0x59f)](_0x2ff65b,_0x54a38e,_0x25947f,_0x1053ef,_0x2c3e24(0x743)):this[_0x2c3e24(0x59f)](_0x2bd7be,_0x54a38e,_0x25947f,_0x1053ef,_0x2c3e24(0x743)),this['resetFontSettings']();},Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x50c)]=function(_0x2cdb5f,_0x350ef0,_0x3b8916,_0x475490,_0x4defd7){const _0x5906ea=_0x4a5d62,_0x4ccb79=ImageManager[_0x5906ea(0x5bc)](_0x5906ea(0x4a4)),_0x57118d=ImageManager['iconWidth'],_0x19ba54=ImageManager[_0x5906ea(0x1f9)],_0x4a772c=_0x2cdb5f%0x10*_0x57118d,_0x3ab048=Math[_0x5906ea(0x734)](_0x2cdb5f/0x10)*_0x19ba54,_0x401b74=_0x475490,_0x384ec8=_0x475490;this[_0x5906ea(0x75e)]['_context'][_0x5906ea(0x717)]=_0x4defd7,this[_0x5906ea(0x75e)]['blt'](_0x4ccb79,_0x4a772c,_0x3ab048,_0x57118d,_0x19ba54,_0x350ef0,_0x3b8916,_0x401b74,_0x384ec8),this[_0x5906ea(0x75e)][_0x5906ea(0x960)][_0x5906ea(0x717)]=!![];},Window_Base['prototype'][_0x4a5d62(0x287)]=function(_0x1ce1de,_0x2e06ce,_0x4c0764,_0x2c766b,_0x5ad33e,_0x59cce0){const _0x5528da=_0x4a5d62,_0xf12e8=Math['floor']((_0x4c0764-0x2)*_0x2c766b),_0x873e66=Sprite_Gauge[_0x5528da(0x5da)][_0x5528da(0x1f6)]['call'](this),_0x231664=_0x2e06ce+this[_0x5528da(0x3aa)]()-_0x873e66-0x2;this[_0x5528da(0x75e)]['fillRect'](_0x1ce1de,_0x231664,_0x4c0764,_0x873e66,ColorManager[_0x5528da(0x3c3)]()),this[_0x5528da(0x75e)][_0x5528da(0x70f)](_0x1ce1de+0x1,_0x231664+0x1,_0xf12e8,_0x873e66-0x2,_0x5ad33e,_0x59cce0);},Window_Scrollable[_0x4a5d62(0x612)]={'enabled':VisuMZ['CoreEngine'][_0x4a5d62(0x7d0)]['Window'][_0x4a5d62(0x8e5)]??!![],'thickness':VisuMZ[_0x4a5d62(0x2df)]['Settings'][_0x4a5d62(0x464)][_0x4a5d62(0x730)]??0x2,'offset':VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x7d0)]['Window'][_0x4a5d62(0x5b3)]??0x2,'bodyColor':VisuMZ['CoreEngine'][_0x4a5d62(0x7d0)][_0x4a5d62(0x464)]['BarBodyColor']??0x0,'offColor':VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x7d0)][_0x4a5d62(0x464)]['OffBarColor']??0x7,'offOpacity':VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x7d0)][_0x4a5d62(0x464)][_0x4a5d62(0x1d5)]??0x80},Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x29d)]=function(){const _0x555646=_0x4a5d62;return Window_Scrollable['SCROLLBAR'][_0x555646(0x585)]&&Window_Scrollable['SCROLLBAR']['thickness']>0x0;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x348)]=Window_Base['prototype']['createContents'],Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x63c)]=function(){const _0x595d6d=_0x4a5d62;VisuMZ[_0x595d6d(0x2df)][_0x595d6d(0x348)]['call'](this),this[_0x595d6d(0x2e5)](),this[_0x595d6d(0x20c)](!![]),this[_0x595d6d(0x20c)](![]);},Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x2e5)]=function(){const _0xc1d499=_0x4a5d62;if(!this[_0xc1d499(0x29d)]())return;if(this['_scrollBarHorz']||this[_0xc1d499(0x4c7)])return;this[_0xc1d499(0x895)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0xc1d499(0x306)]=new Sprite(),this[_0xc1d499(0x4c7)]=new Sprite(),this['addChild'](this[_0xc1d499(0x306)]),this[_0xc1d499(0x46e)](this[_0xc1d499(0x4c7)]);},Window_Base['prototype'][_0x4a5d62(0x20c)]=function(_0x2864c2){const _0x3ef170=_0x4a5d62,_0x2bf3c2=_0x2864c2?this[_0x3ef170(0x306)]:this[_0x3ef170(0x4c7)];if(!_0x2bf3c2)return;const _0x299646=Window_Scrollable['SCROLLBAR'],_0x3d297a=_0x299646['thickness'],_0x84b9a4=_0x2864c2?this['innerWidth']-_0x3d297a*0x2:_0x3d297a,_0x3242eb=_0x2864c2?_0x3d297a:this[_0x3ef170(0x915)]-_0x3d297a*0x2;_0x2bf3c2['bitmap']=new Bitmap(_0x84b9a4,_0x3242eb),_0x2bf3c2[_0x3ef170(0x19b)](0x0,0x0,_0x84b9a4,_0x3242eb),this[_0x3ef170(0x26f)](_0x2864c2);},VisuMZ['CoreEngine'][_0x4a5d62(0x459)]=Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x396)],Window_Base['prototype'][_0x4a5d62(0x396)]=function(){const _0x466450=_0x4a5d62;VisuMZ['CoreEngine'][_0x466450(0x459)][_0x466450(0x35f)](this),this[_0x466450(0x629)]();},Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x629)]=function(){const _0x25bab4=_0x4a5d62,_0x44fd0c=[this[_0x25bab4(0x306)],this[_0x25bab4(0x4c7)]];for(const _0xf53b5f of _0x44fd0c){if(_0xf53b5f&&_0xf53b5f['bitmap'])_0xf53b5f['bitmap'][_0x25bab4(0x880)]();}},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x473)]=Window_Scrollable['prototype'][_0x4a5d62(0x8fa)],Window_Scrollable['prototype'][_0x4a5d62(0x8fa)]=function(){const _0x158716=_0x4a5d62;VisuMZ[_0x158716(0x2df)][_0x158716(0x473)][_0x158716(0x35f)](this),this[_0x158716(0x36c)]();},Window_Scrollable[_0x4a5d62(0x5da)][_0x4a5d62(0x36c)]=function(){const _0x4bf42c=_0x4a5d62;this['updateScrollBarVisibility'](),this[_0x4bf42c(0x7c7)](!![]),this[_0x4bf42c(0x7c7)](![]),this['updateScrollBarPosition'](!![]),this[_0x4bf42c(0x26f)](![]);},Window_Scrollable[_0x4a5d62(0x5da)][_0x4a5d62(0x61e)]=function(){const _0x29874b=_0x4a5d62,_0x2e7f9f=[this[_0x29874b(0x306)],this[_0x29874b(0x4c7)]];for(const _0x43f572 of _0x2e7f9f){_0x43f572&&(_0x43f572[_0x29874b(0x27a)]=this[_0x29874b(0x29d)]()&&this['isOpen']());}},Window_Scrollable[_0x4a5d62(0x5da)][_0x4a5d62(0x7c7)]=function(_0x59a0cd){const _0xcb3e14=_0x4a5d62;if(!this[_0xcb3e14(0x895)])return;const _0x4ab4d4=this[_0xcb3e14(0x357)](_0x59a0cd),_0x1fc8e2=this[_0xcb3e14(0x88f)](_0x59a0cd),_0x4fccf6=_0x59a0cd?'horz':_0xcb3e14(0x804),_0xa8106=_0x59a0cd?'maxHorz':_0xcb3e14(0x7e4);(this['_lastScrollBarValues'][_0x4fccf6]!==_0x4ab4d4||this[_0xcb3e14(0x895)][_0xa8106]!==_0x1fc8e2)&&(this[_0xcb3e14(0x895)][_0x4fccf6]=_0x4ab4d4,this[_0xcb3e14(0x895)][_0xa8106]=_0x1fc8e2,this[_0xcb3e14(0x8d9)](_0x59a0cd,_0x4ab4d4,_0x1fc8e2));},Window_Scrollable[_0x4a5d62(0x5da)][_0x4a5d62(0x357)]=function(_0x14b530){const _0x2d3310=_0x4a5d62;if(this[_0x2d3310(0x26d)]!==undefined)return _0x14b530?this[_0x2d3310(0x559)]():this['origin']['y'];return _0x14b530?this['scrollX']():this[_0x2d3310(0x85c)]();},Window_Scrollable[_0x4a5d62(0x5da)]['maxScrollbar']=function(_0x398187){const _0x23e958=_0x4a5d62;if(this[_0x23e958(0x26d)]!==undefined)return _0x398187?this[_0x23e958(0x5c6)]():Math[_0x23e958(0x4ef)](0x0,this[_0x23e958(0x26d)]-this['innerHeight']);return _0x398187?this[_0x23e958(0x5c6)]():this['maxScrollY']();},Window_Scrollable[_0x4a5d62(0x5da)][_0x4a5d62(0x596)]=function(){const _0x372a1f=_0x4a5d62;if(this['_allTextHeight']!==undefined)return Math[_0x372a1f(0x4ef)](0x0,this[_0x372a1f(0x26d)]);return this[_0x372a1f(0x812)]();},Window_Scrollable[_0x4a5d62(0x5da)][_0x4a5d62(0x8d9)]=function(_0x34557b,_0x77395c,_0x53735e){const _0x14a668=_0x4a5d62,_0x2de07b=_0x34557b?this[_0x14a668(0x306)]:this[_0x14a668(0x4c7)];if(!_0x2de07b)return;if(!_0x2de07b[_0x14a668(0x757)])return;const _0x19627d=_0x2de07b['bitmap'];_0x19627d[_0x14a668(0x650)]();if(_0x53735e<=0x0)return;const _0x5d4a48=_0x34557b?this['innerWidth']/this[_0x14a668(0x3e8)]():this[_0x14a668(0x915)]/this['scrollbarHeight'](),_0x4190ab=_0x34557b?Math[_0x14a668(0x372)](_0x77395c*_0x5d4a48):0x0,_0x4b6053=_0x34557b?0x0:Math[_0x14a668(0x372)](_0x77395c*_0x5d4a48),_0x332751=_0x34557b?Math[_0x14a668(0x372)](_0x19627d[_0x14a668(0x6e0)]*_0x5d4a48):_0x19627d[_0x14a668(0x6e0)],_0x44cb63=_0x34557b?_0x19627d['height']:Math['round'](_0x19627d[_0x14a668(0x592)]*_0x5d4a48),_0x4f4c40=Window_Scrollable[_0x14a668(0x612)],_0x4be198=ColorManager[_0x14a668(0x485)](_0x4f4c40[_0x14a668(0x5ec)]),_0x50c80f=ColorManager['getColor'](_0x4f4c40[_0x14a668(0x95b)]),_0x3d3ec5=_0x4f4c40['offOpacity'];_0x19627d[_0x14a668(0x8c2)]=_0x3d3ec5,_0x19627d[_0x14a668(0x919)](_0x4be198),_0x19627d['paintOpacity']=0xff,_0x19627d[_0x14a668(0x47d)](_0x4190ab,_0x4b6053,_0x332751,_0x44cb63,_0x50c80f);},Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x26f)]=function(_0x4ea6ca){const _0x45fccb=_0x4a5d62,_0x743c65=_0x4ea6ca?this['_scrollBarHorz']:this[_0x45fccb(0x4c7)];if(!_0x743c65)return;const _0x38e8f7=Window_Scrollable[_0x45fccb(0x612)],_0xd4b894=_0x38e8f7[_0x45fccb(0x5d7)],_0x485c86=_0x38e8f7[_0x45fccb(0x5ea)];if(!_0x743c65[_0x45fccb(0x38e)])return;_0x743c65['x']=this[_0x45fccb(0x8ce)]+(_0x4ea6ca?_0xd4b894:this[_0x45fccb(0x610)]+_0x485c86),_0x743c65['y']=this[_0x45fccb(0x8ce)]+(_0x4ea6ca?this['innerHeight']+_0x485c86:_0xd4b894);},Window_Selectable[_0x4a5d62(0x5da)][_0x4a5d62(0x276)]=function(_0x1cb937){const _0x3b022f=_0x4a5d62;let _0x16438e=this['index']();const _0x1de3d3=this[_0x3b022f(0x4e4)](),_0x4bd998=this[_0x3b022f(0x460)]();if(this[_0x3b022f(0x670)]()&&(_0x16438e<_0x1de3d3||_0x1cb937&&_0x4bd998===0x1)){_0x16438e+=_0x4bd998;if(_0x16438e>=_0x1de3d3)_0x16438e=_0x1de3d3-0x1;this['smoothSelect'](_0x16438e);}else!this[_0x3b022f(0x670)]()&&((_0x16438e<_0x1de3d3-_0x4bd998||_0x1cb937&&_0x4bd998===0x1)&&this['smoothSelect']((_0x16438e+_0x4bd998)%_0x1de3d3));},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x566)]=Window_Selectable[_0x4a5d62(0x5da)]['cursorDown'],Window_Selectable[_0x4a5d62(0x5da)][_0x4a5d62(0x276)]=function(_0x338284){const _0x41d906=_0x4a5d62;this[_0x41d906(0x670)]()&&_0x338284&&this['maxCols']()===0x1&&this['index']()===this[_0x41d906(0x4e4)]()-0x1?this[_0x41d906(0x859)](0x0):VisuMZ[_0x41d906(0x2df)][_0x41d906(0x566)][_0x41d906(0x35f)](this,_0x338284);},Window_Selectable[_0x4a5d62(0x5da)]['cursorUp']=function(_0x1345ed){const _0x4a1542=_0x4a5d62;let _0x2e666b=Math[_0x4a1542(0x4ef)](0x0,this['index']());const _0x515eae=this[_0x4a1542(0x4e4)](),_0x2c3dc4=this['maxCols']();if(this['isUseModernControls']()&&_0x2e666b>0x0||_0x1345ed&&_0x2c3dc4===0x1){_0x2e666b-=_0x2c3dc4;if(_0x2e666b<=0x0)_0x2e666b=0x0;this[_0x4a1542(0x859)](_0x2e666b);}else!this[_0x4a1542(0x670)]()&&((_0x2e666b>=_0x2c3dc4||_0x1345ed&&_0x2c3dc4===0x1)&&this[_0x4a1542(0x859)]((_0x2e666b-_0x2c3dc4+_0x515eae)%_0x515eae));},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x1c1)]=Window_Selectable[_0x4a5d62(0x5da)][_0x4a5d62(0x1ef)],Window_Selectable[_0x4a5d62(0x5da)][_0x4a5d62(0x1ef)]=function(_0x4c8b39){const _0x479855=_0x4a5d62;this[_0x479855(0x670)]()&&_0x4c8b39&&this['maxCols']()===0x1&&this['index']()===0x0?this[_0x479855(0x859)](this[_0x479855(0x4e4)]()-0x1):VisuMZ['CoreEngine']['Window_Selectable_cursorUp'][_0x479855(0x35f)](this,_0x4c8b39);},Window_Selectable[_0x4a5d62(0x5da)]['isUseModernControls']=function(){const _0x39ea19=_0x4a5d62;return VisuMZ['CoreEngine']['Settings'][_0x39ea19(0x235)][_0x39ea19(0x58c)];},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x93e)]=Window_Selectable[_0x4a5d62(0x5da)][_0x4a5d62(0x1a6)],Window_Selectable[_0x4a5d62(0x5da)][_0x4a5d62(0x1a6)]=function(){const _0x4092ea=_0x4a5d62;this[_0x4092ea(0x670)]()?(this[_0x4092ea(0x737)](),this['processCursorHomeEndTrigger']()):VisuMZ[_0x4092ea(0x2df)][_0x4092ea(0x93e)][_0x4092ea(0x35f)](this);},Window_Selectable[_0x4a5d62(0x5da)]['allowShiftScrolling']=function(){return!![];},Window_Selectable[_0x4a5d62(0x5da)][_0x4a5d62(0x737)]=function(){const _0xc409f7=_0x4a5d62;if(this['isCursorMovable']()){const _0x5ac1f5=this['index']();Input[_0xc409f7(0x1cb)](_0xc409f7(0x7bc))&&(Input[_0xc409f7(0x890)](_0xc409f7(0x388))&&this['allowShiftScrolling']()?this[_0xc409f7(0x2af)]():this['cursorDown'](Input[_0xc409f7(0x3ba)](_0xc409f7(0x7bc)))),Input[_0xc409f7(0x1cb)]('up')&&(Input[_0xc409f7(0x890)]('shift')&&this[_0xc409f7(0x290)]()?this[_0xc409f7(0x68d)]():this[_0xc409f7(0x1ef)](Input['isTriggered']('up'))),Input[_0xc409f7(0x1cb)]('right')&&this[_0xc409f7(0x95e)](Input[_0xc409f7(0x3ba)](_0xc409f7(0x743))),Input[_0xc409f7(0x1cb)]('left')&&this[_0xc409f7(0x33c)](Input['isTriggered']('left')),!this[_0xc409f7(0x61d)](_0xc409f7(0x865))&&Input[_0xc409f7(0x1cb)](_0xc409f7(0x865))&&this[_0xc409f7(0x2af)](),!this[_0xc409f7(0x61d)](_0xc409f7(0x701))&&Input['isRepeated'](_0xc409f7(0x701))&&this[_0xc409f7(0x68d)](),this['index']()!==_0x5ac1f5&&this[_0xc409f7(0x78f)]();}},Window_Selectable[_0x4a5d62(0x5da)][_0x4a5d62(0x393)]=function(){const _0x1d1b2b=_0x4a5d62;if(this['isCursorMovable']()){const _0x14b6a0=this['index']();Input[_0x1d1b2b(0x3ba)]('home')&&this[_0x1d1b2b(0x859)](Math[_0x1d1b2b(0x8df)](this[_0x1d1b2b(0x3d6)](),0x0)),Input[_0x1d1b2b(0x3ba)](_0x1d1b2b(0x34a))&&this['smoothSelect'](Math[_0x1d1b2b(0x4ef)](this['index'](),this['maxItems']()-0x1)),this[_0x1d1b2b(0x3d6)]()!==_0x14b6a0&&this[_0x1d1b2b(0x78f)]();}},VisuMZ['CoreEngine'][_0x4a5d62(0x8ab)]=Window_Selectable[_0x4a5d62(0x5da)][_0x4a5d62(0x87c)],Window_Selectable[_0x4a5d62(0x5da)][_0x4a5d62(0x87c)]=function(){const _0xa60b77=_0x4a5d62;this[_0xa60b77(0x670)]()?this['processTouchModernControls']():VisuMZ[_0xa60b77(0x2df)][_0xa60b77(0x8ab)][_0xa60b77(0x35f)](this);},Window_Selectable[_0x4a5d62(0x5da)]['processTouchModernControls']=function(){const _0x160546=_0x4a5d62;VisuMZ[_0x160546(0x2df)][_0x160546(0x8ab)][_0x160546(0x35f)](this);},Window_Selectable[_0x4a5d62(0x5da)][_0x4a5d62(0x7a5)]=function(){const _0x15b1a9=_0x4a5d62;return VisuMZ['CoreEngine'][_0x15b1a9(0x7d0)][_0x15b1a9(0x464)][_0x15b1a9(0x247)];},Window_Selectable[_0x4a5d62(0x5da)][_0x4a5d62(0x2ca)]=function(){const _0x217281=_0x4a5d62;return VisuMZ['CoreEngine'][_0x217281(0x7d0)][_0x217281(0x464)][_0x217281(0x52e)];},Window_Selectable[_0x4a5d62(0x5da)][_0x4a5d62(0x4ac)]=function(){const _0x35aa4e=_0x4a5d62;return Window_Scrollable['prototype']['itemHeight'][_0x35aa4e(0x35f)](this)+VisuMZ[_0x35aa4e(0x2df)]['Settings'][_0x35aa4e(0x464)][_0x35aa4e(0x975)];;},VisuMZ[_0x4a5d62(0x2df)]['Window_Selectable_drawBackgroundRect']=Window_Selectable[_0x4a5d62(0x5da)]['drawBackgroundRect'],Window_Selectable['prototype'][_0x4a5d62(0x3c8)]=function(_0x52e378){const _0x30ffbe=_0x4a5d62,_0x47dcef=VisuMZ[_0x30ffbe(0x2df)][_0x30ffbe(0x7d0)][_0x30ffbe(0x464)];if(_0x47dcef[_0x30ffbe(0x5e7)]===![])return;_0x47dcef['DrawItemBackgroundJS']?_0x47dcef['DrawItemBackgroundJS'][_0x30ffbe(0x35f)](this,_0x52e378):VisuMZ['CoreEngine'][_0x30ffbe(0x336)]['call'](this,_0x52e378);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x3d5)]=Window_Gold[_0x4a5d62(0x5da)][_0x4a5d62(0x278)],Window_Gold[_0x4a5d62(0x5da)][_0x4a5d62(0x278)]=function(){const _0x105fd8=_0x4a5d62;this[_0x105fd8(0x793)]()?this[_0x105fd8(0x543)]():VisuMZ[_0x105fd8(0x2df)]['Window_Gold_refresh'][_0x105fd8(0x35f)](this);},Window_Gold[_0x4a5d62(0x5da)][_0x4a5d62(0x793)]=function(){const _0x29f751=_0x4a5d62;if(TextManager[_0x29f751(0x385)]!==this[_0x29f751(0x385)]())return![];return VisuMZ[_0x29f751(0x2df)][_0x29f751(0x7d0)]['Gold']['ItemStyle'];},Window_Gold[_0x4a5d62(0x5da)][_0x4a5d62(0x543)]=function(){const _0x50f1cd=_0x4a5d62;this[_0x50f1cd(0x209)](),this[_0x50f1cd(0x75e)][_0x50f1cd(0x650)](),this[_0x50f1cd(0x75e)][_0x50f1cd(0x471)]=VisuMZ[_0x50f1cd(0x2df)][_0x50f1cd(0x7d0)]['Gold']['GoldFontSize'];const _0x395a9d=VisuMZ['CoreEngine'][_0x50f1cd(0x7d0)]['Gold'][_0x50f1cd(0x2c0)],_0x21b1ff=this[_0x50f1cd(0x983)](0x0);if(_0x395a9d>0x0){const _0x4aabda=ImageManager[_0x50f1cd(0x455)]||0x20,_0x51ce6d=_0x4aabda-ImageManager[_0x50f1cd(0x285)],_0x1d1f60=_0x21b1ff['y']+(this[_0x50f1cd(0x3aa)]()-ImageManager[_0x50f1cd(0x1f9)])/0x2;this[_0x50f1cd(0x20e)](_0x395a9d,_0x21b1ff['x']+Math[_0x50f1cd(0x783)](_0x51ce6d/0x2),_0x1d1f60);const _0x914724=_0x4aabda+0x4;_0x21b1ff['x']+=_0x914724,_0x21b1ff[_0x50f1cd(0x6e0)]-=_0x914724;}this[_0x50f1cd(0x270)](ColorManager['systemColor']()),this[_0x50f1cd(0x59f)](this[_0x50f1cd(0x385)](),_0x21b1ff['x'],_0x21b1ff['y'],_0x21b1ff['width'],_0x50f1cd(0x474));const _0x2b08b5=this[_0x50f1cd(0x67a)](this[_0x50f1cd(0x385)]())+0x6;;_0x21b1ff['x']+=_0x2b08b5,_0x21b1ff[_0x50f1cd(0x6e0)]-=_0x2b08b5,this[_0x50f1cd(0x3f7)]();const _0x47c847=this[_0x50f1cd(0x6d3)](),_0xd9a84=this[_0x50f1cd(0x67a)](this[_0x50f1cd(0x861)]?VisuMZ[_0x50f1cd(0x228)](this[_0x50f1cd(0x6d3)]()):this[_0x50f1cd(0x6d3)]()),_0x2480af=VisuMZ['CoreEngine'][_0x50f1cd(0x7d0)][_0x50f1cd(0x66a)][_0x50f1cd(0x1e6)][_0x50f1cd(0x5d4)]();_0xd9a84>_0x21b1ff[_0x50f1cd(0x6e0)]&&_0x2480af!==''?this['drawText'](_0x2480af,_0x21b1ff['x'],_0x21b1ff['y'],_0x21b1ff[_0x50f1cd(0x6e0)],_0x50f1cd(0x743)):this[_0x50f1cd(0x59f)](this[_0x50f1cd(0x6d3)](),_0x21b1ff['x'],_0x21b1ff['y'],_0x21b1ff[_0x50f1cd(0x6e0)],_0x50f1cd(0x743)),this[_0x50f1cd(0x209)]();},Window_StatusBase[_0x4a5d62(0x5da)][_0x4a5d62(0x7f9)]=function(_0x1bdb14,_0x406413,_0x4e93df,_0x3f3806,_0x1ed478){const _0x610fbe=_0x4a5d62;_0x3f3806=String(_0x3f3806||'')['toUpperCase']();if(VisuMZ['CoreEngine'][_0x610fbe(0x7d0)][_0x610fbe(0x6ea)]['DrawIcons']){const _0x49736b=VisuMZ[_0x610fbe(0x871)](_0x3f3806);if(_0x1ed478)this['drawIconBySize'](_0x49736b,_0x1bdb14,_0x406413,this[_0x610fbe(0x43c)]()),_0x4e93df-=this['gaugeLineHeight']()+0x2,_0x1bdb14+=this[_0x610fbe(0x43c)]()+0x2;else{const _0x15dd19=ImageManager[_0x610fbe(0x455)]||0x20,_0x2de10a=ImageManager['standardIconHeight']||0x20,_0x2903d7=_0x15dd19-ImageManager['iconWidth'],_0x4ca3ba=_0x2de10a-ImageManager[_0x610fbe(0x1f9)];let _0xf7e830=0x2,_0x2b4fd1=0x2;this[_0x610fbe(0x3aa)]()!==0x24&&(_0x2b4fd1=Math[_0x610fbe(0x734)]((this[_0x610fbe(0x3aa)]()-_0x2de10a)/0x2));const _0x178e78=_0x1bdb14+Math[_0x610fbe(0x734)](_0x2903d7/0x2)+_0xf7e830,_0x3deec5=_0x406413+Math[_0x610fbe(0x734)](_0x4ca3ba/0x2)+_0x2b4fd1;this[_0x610fbe(0x20e)](_0x49736b,_0x178e78,_0x3deec5),_0x4e93df-=_0x15dd19+0x4,_0x1bdb14+=_0x15dd19+0x4;}}const _0x4f1aef=TextManager[_0x610fbe(0x656)](_0x3f3806);this[_0x610fbe(0x209)](),this[_0x610fbe(0x270)](ColorManager['systemColor']()),_0x1ed478?(this[_0x610fbe(0x75e)][_0x610fbe(0x471)]=this[_0x610fbe(0x98b)](),this[_0x610fbe(0x75e)][_0x610fbe(0x59f)](_0x4f1aef,_0x1bdb14,_0x406413,_0x4e93df,this[_0x610fbe(0x43c)](),_0x610fbe(0x474))):this['drawText'](_0x4f1aef,_0x1bdb14,_0x406413,_0x4e93df),this[_0x610fbe(0x209)]();},Window_StatusBase[_0x4a5d62(0x5da)][_0x4a5d62(0x98b)]=function(){const _0x11b997=_0x4a5d62;return $gameSystem[_0x11b997(0x76c)]()-0x8;},Window_StatusBase[_0x4a5d62(0x5da)]['drawActorClass']=function(_0x102e71,_0x4f7280,_0x2cec6a,_0x1c9ebc){const _0x32f3e8=_0x4a5d62;_0x1c9ebc=_0x1c9ebc||0xa8,this['resetTextColor']();if(VisuMZ[_0x32f3e8(0x2df)]['Settings']['UI']['TextCodeClassNames'])this[_0x32f3e8(0x205)](_0x102e71['currentClass']()[_0x32f3e8(0x79f)],_0x4f7280,_0x2cec6a,_0x1c9ebc);else{const _0x283c84=_0x102e71[_0x32f3e8(0x4f4)]()[_0x32f3e8(0x79f)][_0x32f3e8(0x805)](/\\I\[(\d+)\]/gi,'');this[_0x32f3e8(0x59f)](_0x283c84,_0x4f7280,_0x2cec6a,_0x1c9ebc);}},Window_StatusBase['prototype'][_0x4a5d62(0x241)]=function(_0x3252b6,_0x4c3f12,_0x319610,_0x3231b1){const _0x56156e=_0x4a5d62;_0x3231b1=_0x3231b1||0x10e,this[_0x56156e(0x3f7)]();if(VisuMZ[_0x56156e(0x2df)][_0x56156e(0x7d0)]['UI']['TextCodeNicknames'])this[_0x56156e(0x205)](_0x3252b6['nickname'](),_0x4c3f12,_0x319610,_0x3231b1);else{const _0x5357e5=_0x3252b6[_0x56156e(0x7e3)]()[_0x56156e(0x805)](/\\I\[(\d+)\]/gi,'');this[_0x56156e(0x59f)](_0x3252b6['nickname'](),_0x4c3f12,_0x319610,_0x3231b1);}},VisuMZ['CoreEngine'][_0x4a5d62(0x883)]=Window_StatusBase[_0x4a5d62(0x5da)]['drawActorLevel'],Window_StatusBase[_0x4a5d62(0x5da)][_0x4a5d62(0x673)]=function(_0x29340a,_0x4fbba7,_0x9cde0f){const _0x16f8ed=_0x4a5d62;if(VisuMZ[_0x16f8ed(0x2df)]['Settings'][_0x16f8ed(0x6ea)][_0x16f8ed(0x926)]===![])return;if(this[_0x16f8ed(0x40c)]())this[_0x16f8ed(0x2eb)](_0x29340a,_0x4fbba7,_0x9cde0f);VisuMZ[_0x16f8ed(0x2df)]['Window_StatusBase_drawActorLevel'][_0x16f8ed(0x35f)](this,_0x29340a,_0x4fbba7,_0x9cde0f);},Window_StatusBase[_0x4a5d62(0x5da)][_0x4a5d62(0x40c)]=function(){const _0x417935=_0x4a5d62;return VisuMZ[_0x417935(0x2df)][_0x417935(0x7d0)]['UI'][_0x417935(0x1e8)];},Window_StatusBase['prototype']['drawActorExpGauge']=function(_0x59e8ad,_0x5ca68b,_0x1c2d14){const _0x5a6d54=_0x4a5d62;if(!_0x59e8ad)return;if(!_0x59e8ad['isActor']())return;const _0x76382a=0x80,_0x395d71=_0x59e8ad[_0x5a6d54(0x6a7)]();let _0x48662c=ColorManager[_0x5a6d54(0x382)](),_0x31eb6c=ColorManager[_0x5a6d54(0x26a)]();_0x395d71>=0x1&&(_0x48662c=ColorManager[_0x5a6d54(0x8eb)](),_0x31eb6c=ColorManager[_0x5a6d54(0x2ea)]()),this[_0x5a6d54(0x287)](_0x5ca68b,_0x1c2d14,_0x76382a,_0x395d71,_0x48662c,_0x31eb6c);},Window_EquipStatus[_0x4a5d62(0x5da)][_0x4a5d62(0x4ee)]=function(){const _0x593fcc=_0x4a5d62;let _0x24090a=0x0;for(const _0x57e3c0 of VisuMZ[_0x593fcc(0x2df)][_0x593fcc(0x7d0)][_0x593fcc(0x6ea)][_0x593fcc(0x1f5)]){const _0x138d59=this[_0x593fcc(0x74e)](),_0x2b4280=this[_0x593fcc(0x47c)](_0x24090a);this['drawItem'](_0x138d59,_0x2b4280,_0x57e3c0),_0x24090a++;}},Window_EquipStatus[_0x4a5d62(0x5da)][_0x4a5d62(0x4ce)]=function(_0x2e4a63,_0x44fdf2,_0x131372){const _0x50ce87=_0x4a5d62,_0x1acb2b=this[_0x50ce87(0x796)]()-this[_0x50ce87(0x74e)]()*0x2;this[_0x50ce87(0x7f9)](_0x2e4a63,_0x44fdf2,_0x1acb2b,_0x131372,![]);},Window_EquipStatus['prototype']['drawCurrentParam']=function(_0x2af670,_0x32d4d5,_0x28d8f3){const _0x73fe=_0x4a5d62,_0x176686=this[_0x73fe(0x45c)]();this['resetTextColor'](),this[_0x73fe(0x59f)](this[_0x73fe(0x698)]['paramValueByName'](_0x28d8f3,!![]),_0x2af670,_0x32d4d5,_0x176686,_0x73fe(0x743));},Window_EquipStatus[_0x4a5d62(0x5da)][_0x4a5d62(0x939)]=function(_0x2c22c9,_0x3e3408){const _0x4053ac=_0x4a5d62,_0x494418=this['rightArrowWidth']();this[_0x4053ac(0x270)](ColorManager['systemColor']());const _0x337452=VisuMZ[_0x4053ac(0x2df)]['Settings']['UI'][_0x4053ac(0x215)];this[_0x4053ac(0x59f)](_0x337452,_0x2c22c9,_0x3e3408,_0x494418,'center');},Window_EquipStatus[_0x4a5d62(0x5da)][_0x4a5d62(0x550)]=function(_0x5de063,_0x312032,_0x4e9970){const _0x2fee26=_0x4a5d62,_0x3cf926=this[_0x2fee26(0x45c)](),_0x4fae7e=this[_0x2fee26(0x851)][_0x2fee26(0x93b)](_0x4e9970),_0xe60f9e=_0x4fae7e-this['_actor']['paramValueByName'](_0x4e9970);this[_0x2fee26(0x270)](ColorManager['paramchangeTextColor'](_0xe60f9e)),this['drawText'](this[_0x2fee26(0x851)][_0x2fee26(0x93b)](_0x4e9970,!![]),_0x5de063,_0x312032,_0x3cf926,_0x2fee26(0x743));},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x3bd)]=Window_EquipItem[_0x4a5d62(0x5da)]['isEnabled'],Window_EquipItem[_0x4a5d62(0x5da)]['isEnabled']=function(_0x3e16db){const _0x564846=_0x4a5d62;return _0x3e16db&&this[_0x564846(0x698)]?this[_0x564846(0x698)]['canEquip'](_0x3e16db):VisuMZ[_0x564846(0x2df)][_0x564846(0x3bd)][_0x564846(0x35f)](this,_0x3e16db);},Window_StatusParams[_0x4a5d62(0x5da)][_0x4a5d62(0x4e4)]=function(){const _0x4c6dc7=_0x4a5d62;return VisuMZ[_0x4c6dc7(0x2df)][_0x4c6dc7(0x7d0)][_0x4c6dc7(0x6ea)][_0x4c6dc7(0x1f5)][_0x4c6dc7(0x6d1)];},Window_StatusParams['prototype'][_0x4a5d62(0x765)]=function(_0x523928){const _0x40806c=_0x4a5d62,_0x28b026=this[_0x40806c(0x983)](_0x523928),_0x5cbb42=VisuMZ[_0x40806c(0x2df)][_0x40806c(0x7d0)][_0x40806c(0x6ea)][_0x40806c(0x1f5)][_0x523928],_0x50539e=TextManager[_0x40806c(0x656)](_0x5cbb42),_0x3ef0a6=this[_0x40806c(0x698)]['paramValueByName'](_0x5cbb42,!![]);this[_0x40806c(0x7f9)](_0x28b026['x'],_0x28b026['y'],0xa0,_0x5cbb42,![]),this[_0x40806c(0x3f7)](),this[_0x40806c(0x59f)](_0x3ef0a6,_0x28b026['x']+0xa0,_0x28b026['y'],0x3c,_0x40806c(0x743));};if(VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x7d0)]['KeyboardInput'][_0x4a5d62(0x92f)]){VisuMZ[_0x4a5d62(0x2df)]['Settings'][_0x4a5d62(0x994)][_0x4a5d62(0x702)]&&(Window_NameInput[_0x4a5d62(0x7c3)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20','Page','OK']);;VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x710)]=Window_NameInput[_0x4a5d62(0x5da)][_0x4a5d62(0x96b)],Window_NameInput[_0x4a5d62(0x5da)][_0x4a5d62(0x96b)]=function(_0x85966a){const _0x4888e7=_0x4a5d62;this['_mode']=this[_0x4888e7(0x5a1)](),VisuMZ[_0x4888e7(0x2df)][_0x4888e7(0x710)]['call'](this,_0x85966a),this[_0x4888e7(0x6bb)]===_0x4888e7(0x68a)?this[_0x4888e7(0x1e4)](0x0):(Input['clear'](),this[_0x4888e7(0x797)]());},Window_NameInput[_0x4a5d62(0x5da)]['defaultInputMode']=function(){const _0x3fe710=_0x4a5d62;if(Input['isGamepadConnected']())return _0x3fe710(0x68a);return VisuMZ['CoreEngine'][_0x3fe710(0x7d0)]['KeyboardInput']['DefaultMode']||_0x3fe710(0x316);},VisuMZ[_0x4a5d62(0x2df)]['Window_NameInput_processHandling']=Window_NameInput[_0x4a5d62(0x5da)][_0x4a5d62(0x24a)],Window_NameInput['prototype'][_0x4a5d62(0x24a)]=function(){const _0x1c4768=_0x4a5d62;if(!this[_0x1c4768(0x2d7)]())return;if(!this[_0x1c4768(0x7b8)])return;if(this[_0x1c4768(0x6bb)]===_0x1c4768(0x316)&&Input[_0x1c4768(0x64e)]())this['switchModes'](_0x1c4768(0x68a));else{if(Input[_0x1c4768(0x922)](_0x1c4768(0x351)))Input[_0x1c4768(0x650)](),this[_0x1c4768(0x788)]();else{if(Input[_0x1c4768(0x3ba)]('tab'))Input[_0x1c4768(0x650)](),this[_0x1c4768(0x6bb)]==='keyboard'?this['switchModes']('default'):this[_0x1c4768(0x5a3)]('keyboard');else{if(this[_0x1c4768(0x6bb)]===_0x1c4768(0x316))this[_0x1c4768(0x25c)]();else Input['isSpecialCode']('escape')?(Input[_0x1c4768(0x650)](),this[_0x1c4768(0x5a3)]('keyboard')):VisuMZ[_0x1c4768(0x2df)][_0x1c4768(0x927)]['call'](this);}}}},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x5b5)]=Window_NameInput['prototype'][_0x4a5d62(0x87c)],Window_NameInput[_0x4a5d62(0x5da)][_0x4a5d62(0x87c)]=function(){const _0x93e1b=_0x4a5d62;if(!this['isOpenAndActive']())return;if(this[_0x93e1b(0x6bb)]===_0x93e1b(0x316)){if(TouchInput['isTriggered']()&&this['isTouchedInsideFrame']())this['switchModes'](_0x93e1b(0x68a));else TouchInput[_0x93e1b(0x3e7)]()&&this[_0x93e1b(0x5a3)](_0x93e1b(0x68a));}else VisuMZ['CoreEngine'][_0x93e1b(0x5b5)]['call'](this);},Window_NameInput[_0x4a5d62(0x5da)][_0x4a5d62(0x25c)]=function(){const _0x84d8af=_0x4a5d62;if(Input[_0x84d8af(0x922)](_0x84d8af(0x8a0)))Input[_0x84d8af(0x650)](),this[_0x84d8af(0x437)]();else{if(Input[_0x84d8af(0x892)]!==undefined){let _0x1af3b6=Input[_0x84d8af(0x892)],_0x4f66b7=_0x1af3b6['length'];for(let _0x25e734=0x0;_0x25e734<_0x4f66b7;++_0x25e734){this[_0x84d8af(0x73b)][_0x84d8af(0x728)](_0x1af3b6[_0x25e734])?SoundManager[_0x84d8af(0x97d)]():SoundManager[_0x84d8af(0x2a9)]();}Input[_0x84d8af(0x650)]();}}},Window_NameInput[_0x4a5d62(0x5da)][_0x4a5d62(0x5a3)]=function(_0x36353e){const _0x3bd26e=_0x4a5d62;let _0x4088d6=this[_0x3bd26e(0x6bb)];this[_0x3bd26e(0x6bb)]=_0x36353e,_0x4088d6!==this['_mode']&&(this[_0x3bd26e(0x278)](),SoundManager['playOk'](),this[_0x3bd26e(0x6bb)]===_0x3bd26e(0x68a)?this[_0x3bd26e(0x1e4)](0x0):this['select'](-0x1));},VisuMZ[_0x4a5d62(0x2df)]['Window_NameInput_cursorDown']=Window_NameInput['prototype'][_0x4a5d62(0x276)],Window_NameInput[_0x4a5d62(0x5da)]['cursorDown']=function(_0x5c0ab3){const _0x109985=_0x4a5d62;if(this[_0x109985(0x6bb)]===_0x109985(0x316)&&!Input[_0x109985(0x659)]())return;if(Input[_0x109985(0x4bd)]())return;VisuMZ[_0x109985(0x2df)][_0x109985(0x401)][_0x109985(0x35f)](this,_0x5c0ab3),this[_0x109985(0x5a3)]('default');},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x846)]=Window_NameInput[_0x4a5d62(0x5da)]['cursorUp'],Window_NameInput[_0x4a5d62(0x5da)][_0x4a5d62(0x1ef)]=function(_0x36bd2c){const _0x3a1a1d=_0x4a5d62;if(this['_mode']===_0x3a1a1d(0x316)&&!Input['isArrowPressed']())return;if(Input[_0x3a1a1d(0x4bd)]())return;VisuMZ['CoreEngine'][_0x3a1a1d(0x846)]['call'](this,_0x36bd2c),this[_0x3a1a1d(0x5a3)](_0x3a1a1d(0x68a));},VisuMZ['CoreEngine']['Window_NameInput_cursorRight']=Window_NameInput['prototype'][_0x4a5d62(0x95e)],Window_NameInput['prototype'][_0x4a5d62(0x95e)]=function(_0x3e2eac){const _0x4c60d3=_0x4a5d62;if(this[_0x4c60d3(0x6bb)]===_0x4c60d3(0x316)&&!Input[_0x4c60d3(0x659)]())return;if(Input[_0x4c60d3(0x4bd)]())return;VisuMZ[_0x4c60d3(0x2df)]['Window_NameInput_cursorRight'][_0x4c60d3(0x35f)](this,_0x3e2eac),this[_0x4c60d3(0x5a3)](_0x4c60d3(0x68a));},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x89b)]=Window_NameInput['prototype'][_0x4a5d62(0x33c)],Window_NameInput[_0x4a5d62(0x5da)]['cursorLeft']=function(_0xa75221){const _0x30ca10=_0x4a5d62;if(this[_0x30ca10(0x6bb)]===_0x30ca10(0x316)&&!Input[_0x30ca10(0x659)]())return;if(Input[_0x30ca10(0x4bd)]())return;VisuMZ['CoreEngine'][_0x30ca10(0x89b)][_0x30ca10(0x35f)](this,_0xa75221),this[_0x30ca10(0x5a3)](_0x30ca10(0x68a));},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x1a9)]=Window_NameInput['prototype'][_0x4a5d62(0x2af)],Window_NameInput['prototype'][_0x4a5d62(0x2af)]=function(){const _0x4e7f71=_0x4a5d62;if(this[_0x4e7f71(0x6bb)]===_0x4e7f71(0x316))return;if(Input['isNumpadPressed']())return;VisuMZ[_0x4e7f71(0x2df)][_0x4e7f71(0x1a9)]['call'](this),this['switchModes'](_0x4e7f71(0x68a));},VisuMZ['CoreEngine']['Window_NameInput_cursorPageup']=Window_NameInput['prototype'][_0x4a5d62(0x68d)],Window_NameInput['prototype'][_0x4a5d62(0x68d)]=function(){const _0x97c75e=_0x4a5d62;if(this['_mode']===_0x97c75e(0x316))return;if(Input['isNumpadPressed']())return;VisuMZ[_0x97c75e(0x2df)][_0x97c75e(0x6cf)]['call'](this),this[_0x97c75e(0x5a3)](_0x97c75e(0x68a));},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x8e0)]=Window_NameInput[_0x4a5d62(0x5da)]['refresh'],Window_NameInput['prototype']['refresh']=function(){const _0x763f66=_0x4a5d62;if(this[_0x763f66(0x6bb)]==='keyboard'){this[_0x763f66(0x75e)][_0x763f66(0x650)](),this['contentsBack']['clear'](),this[_0x763f66(0x3f7)]();let _0x22e754=VisuMZ[_0x763f66(0x2df)][_0x763f66(0x7d0)]['KeyboardInput'][_0x763f66(0x328)][_0x763f66(0x89f)]('\x0a'),_0x72e065=_0x22e754[_0x763f66(0x6d1)],_0xbf4ad=(this[_0x763f66(0x915)]-_0x72e065*this['lineHeight']())/0x2;for(let _0x49a2ca=0x0;_0x49a2ca<_0x72e065;++_0x49a2ca){let _0x1e0993=_0x22e754[_0x49a2ca],_0x38d49f=this['textSizeEx'](_0x1e0993)[_0x763f66(0x6e0)],_0x43c1b4=Math['floor']((this[_0x763f66(0x75e)][_0x763f66(0x6e0)]-_0x38d49f)/0x2);this['drawTextEx'](_0x1e0993,_0x43c1b4,_0xbf4ad),_0xbf4ad+=this[_0x763f66(0x3aa)]();}}else VisuMZ[_0x763f66(0x2df)][_0x763f66(0x8e0)]['call'](this);};}function _0x579a(){const _0x300cf6=['requestMotion','loadSystemImages','tpGaugeColor1','down','executeLoad','_anchor','drawActorIcons','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','setTargetAnchor','battlerHue','LATIN1','updateTpbChargeTime','reserveCommonEvent','createTextPopupWindow','checkScrollBarBitmap','Scene_Boot_startNormalGame','xparamFlatBonus','_bgmBuffer','MDR','SellBgType','en-US','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','NumberRect','Settings','shake','_scene','_coreEasingType','text','Graphics_printError','buttonAssistOffset3','JsReplaceUserVar','_hp','STB','retrievePointAnimation','titles1','IconXParam2','STENCIL_TEST','IconSParam6','processKeyboardDigitChange','gainSilentTp','RIGHT','_screenY','nickname','maxVert','_customModified','goldWindowRect','setCoreEngineUpdateWindowBg','isGamepadAxisMoved','JSON','setHome','itemWindowRect','subjectHitRate','move','onload','keyMapper','buttonAssistText1','INQUINT','ColorPowerDown','WIN_OEM_ENLW','Game_Map_scrollUp','RevertPreserveNumbers','\x0a\x0a\x0a\x0a\x0a','isEnabled','batch','drawParamText','_number','LoadMenu','pendingColor','loadMapData','checkSubstitute','BattleManager_invokeCounterAttack','Bitmap_clearRect','3HaAzoX','GameEnd','playBgs','vert','replace','HOME','format','pictureId','NON_FRAME','_realScale','isClosing','useDigitGrouping','close','ColorHPGauge2','AccuracyBoost','NUMPAD4','_onceParallelInterpreters','overallHeight','onInputOk','OkText','addEventListener','MEV','pointY','addWindow','setupBattleTestItems','_stored_mpGaugeColor2','_slotWindow','AnimationID','mainAreaHeight','EquipMenu','paramFlat','blt','successRate','targetOpacity','IconParam4','Window_Base_initialize','hpColor','isInstanceOfSceneMap','updateOpen','_image','Window_TitleCommand_selectLast','repeat','PGDN','EQUAL','OpenConsole','retreat','xparamPlus1','terminate','operand','Tilemap_addShadow','forceOutOfPlaytest','Scene_MenuBase_mainAreaTop','usableSkills','powerDownColor','NUM_LOCK','loadWindowskin','xScrollLinkedOffset','rgba(0,\x200,\x200,\x200.7)','actorWindowRect','Window_SkillList_includes','title','sv_actors','WIN_OEM_PA1','F6key','SceneManager_initialize','App','stencilOp','Game_Action_numRepeats','enemy','Window_NameInput_cursorUp','autoRemovalTiming','concat','TRG','FontWidthFix','Item-%1-%2','isPlaytest','CRI','CAPSLOCK','SystemSetSideView','this.paramBase(7)','_tempActor','DigitGroupingExText','this.paramBase(6)','updateScene','setActorHomeRepositioned','outlineColorDmg','CancelText','updatePictureCoordinates','smoothSelect','Icon','%1〘Choice\x20Cancel〙%1','scrollY','SEPARATOR','updateBackOpacity','Upper\x20Left','Window_StatusBase_drawActorSimpleStatus','_digitGrouping','subtitle','KeyTAB','strokeRect','pagedown','ZERO','BattleManager_checkSubstitute','ExtractStrFromList','addLoadListener','_mapNameWindow','XParamVocab4','initTpbChargeTime','refreshWithTextCodeSupport','determineSideButtonLayoutValid','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','Opacity','GetParamIcon','BTestArmors','Game_Map_changeTileset','VisuMZ_2_BattleSystemETB','LESS_THAN','destroyCoreEngineMarkedBitmaps','_updateFilterArea','CustomParamType','sceneTerminationClearEffects','215444KPnFzW','Map%1','processTouch','onInputBannedWords','touchUI','MCR','destroy','_repositioned','initCoreEngineScreenShake','Window_StatusBase_drawActorLevel','ONE','Spriteset_Map_createTilemap','_backgroundSprite','processEscape','playTestShiftT','checkPassage','ParseTilesetNotetags','shouldAutosave','measureTextWidth','font','command355','maxScrollbar','isPressed','TextManager_param','_inputString','AudioChangeBgsPitch','ExportString','_lastScrollBarValues','isEnemy','advanced','initVisuMZCoreEngine','buttonAssistKey%1','onEscapeSuccess','Window_NameInput_cursorLeft','isSceneMap','_refreshPauseSign','stencilFunc','split','enter','ButtonAssist','DOWN','_tileSprite','updatePictureSettings','INBACK','createEnemies','DurationPerChat','createCustomBackgroundImages','StartID','currentValue','Window_Selectable_processTouch','F23','updateOpacity','XParamVocab1','ENTER','fadeSpeed','AntiZoomPictures','processKeyboardBackspace','viewport','buttonAssistWindowSideRect','_makeFontNameText','ParseArmorNotetags','wait','INQUAD','VisuMZ_2_BattleSystemCTB','_stored_gaugeBackColor','updateCoreEasing','smooth','setViewportCoreEngineFix','toUpperCase','onButtonImageLoad','SwitchToggleOne','buttonAssistWindowRect','paintOpacity','VisuMZ_2_BattleSystemBTB','show','setupCustomRateCoreEngine','send','Game_Map_scrollRight','this.paramBase(5)','INCIRC','origin','centerY','enableDigitGroupingEx','DEFAULT_SHIFT_Y','padding','endBattlerActions','WIN_OEM_RESET','toLocaleString','STR','ALT','useFontWidthFix','statusWindowRect','BACK_QUOTE','makeCoreEngineCommandList','changeAnglePlusData','refreshScrollBarBitmap','createWindowLayer','setMute','_cacheScaleY','_lastCommandSymbol','this.paramBase(0)','min','Window_NameInput_refresh','_hideButtons','open','Game_Picture_scaleX','WIN_ICO_HELP','ShowScrollBar','WIN_ICO_00','MIN_SAFE_INTEGER','setBackgroundOpacity','EscapeAlways','centerCameraCheckData','maxLvGaugeColor1','ARRAYSTR','createPageButtons','_categoryWindow','Max','RepositionEnemies130','updateFrame','_timeDuration','DisplayLockY','initialBattleSystem','render','makeDocumentTitle','BottomButtons','WIN_ICO_CLEAR','evaluate','update','WIN_OEM_FJ_LOYA','eva','ExportCurTroopText','uiAreaHeight','skills','itemBackColor2','learnings','createAnimationSprite','_stored_expGaugeColor2','CNT','processSoundTimings','areTileShadowsHidden','pos','paramName','FDR','_inputWindow','Scene_Base_create','Control\x20Variables\x20Script\x20Error','reserveNewGameCommonEvent','Game_Temp_initialize','EnableJS','isPhysical','drawFace','Abbreviation','WIN_OEM_WSCTRL','_windowLayer','innerHeight','isMagical','alwaysDash','SaveMenu','fillAll','skipBranch','_windowskin','_stored_expGaugeColor1','isMaskingEnabled','EXECUTE','VOLUME_UP','Bitmap_fillRect','VisuMZ_4_UniqueTileEffects','isSpecialCode','offsetX','Game_Picture_scaleY','ListRect','ShowActorLevel','Window_NameInput_processHandling','_url','Scene_MenuBase_createBackground','ColorSystem','Wait','ParamMax','clearStencil','_tile','EnableNameInput','cos','buttonAssistOffset%1','sparam','\x5c}❪TAB❫\x5c{','_stored_tpCostColor','Game_Actor_changeClass','buttonAssistOffset4','Script\x20Call\x20Error\x20from\x20Event\x20%1','Game_Interpreter_command355','drawRightArrow','#%1','paramValueByName','bgmVolume','ONE_MINUS_SRC_ALPHA','Window_Selectable_processCursorMove','_opening','Window_NumberInput_processDigitChange','baseTextRect','Game_Actor_paramBase','boxWidth','xparamPlus','_effectsContainer','isSideView','XParamVocab3','seVolume','NameMenu','_clientArea','OUTBOUNCE','⚠️⚠️⚠️\x20Conditional\x20Branch\x20Script\x20Error!\x20⚠️⚠️⚠️','Scene_Map_createSpritesetFix','vertical','NUMPAD5','SParamVocab5','drawBackground','DEF','MDF','DummyBgType','ColorHPGauge1','XParamVocab9','child_process','isActor','scrollDown','CTB','bodyColor','makeTargetSprites','clamp','cursorRight','sparamPlus1','_context','PRINT','mainAreaTopSideButtonLayout','create','onKeyDown','Game_BattlerBase_initMembers','ExtractStrFromTroop','measureTextWidthNoRounding','outlineColor','_targetOffsetX','DECIMAL','initialize','INOUTQUAD','getCoreEngineScreenShakeStyle','getColorDataFromPluginParameters','XParamVocab8','getKeyboardInputButtonString','13VDntBX','process_VisuMZ_CoreEngine_CustomParameters','JUNJA','MAX_SAFE_INTEGER','ItemHeight','isEventRunning','STRUCT','_commandList','HelpBgType','BlurFilter','COMMA','charAt','playOk','Game_Actor_levelUp','invokeCounterAttack','2160648gTWzmO','mute','eventsXyNt','itemLineRect','checkPlayerLocation','GoldFontSize','gaugeRate','_drawTextOutline','Sprite_StateIcon_loadBitmap','displayName','overrideMimeType','smallParamFontSize','push','PictureEraseRange','LEFT','_muteSound','pictures','playtestQuickLoad','mev','DamageColor','KeyboardInput','Input_shouldPreventDefault','Window_Base_drawFace','drawTextTopAligned','INOUTQUART','buttonAssistOffset2','onBattleEnd','ParseActorNotetags','GoldChange','_digitGroupingEx','LevelUpFullMp','FunctionName','_blank','params','createCancelButton','PictureRotate','asin','GET','string','OptionsRect','_shakeDuration','setFrame','setSkill','_commonEventLayers','Tilemap_addSpotTile','paramFlatJS','isKeyItem','PGUP','drawActorSimpleStatus','Scene_Map_update','_refreshBack','Basic','processCursorMove','CallHandlerJS','COLON','Window_NameInput_cursorPagedown','globalAlpha','Enemy-%1-%2','zoomScale','OutlineColor','updateMainMultiply','SlotRect','this.paramBase(3)','setupRate','ColorMaxLvGauge2','Y:\x20%1','storeMapData','Power','Linear','FontShadows','reduce','ItemPadding','tilesetFlags','tpbAcceleration','clearOnceParallelInterpreters','paramRateJS','_sideButtonLayout','applyEasing','horizontal','Window_Selectable_cursorUp','key%1','performMiss','onDatabaseLoaded','IconParam5','DTB','ControllerMatches','createFauxAnimationSprite','faces','DigitGroupingStandardText','isRepeated','paramPlusJS','includes','clearCachedKeys','random','paramPlus','setValue','BasicParameterFormula','getControllerInputButtonString','context','OffBarOpacity','VOLUME_DOWN','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','INOUTCIRC','CustomParamIcons','cancel','areButtonsHidden','CRSEL','1.10.0','ActorBgType','_drawTextBody','MAT','dummyWindowRect','_inBattle','SLASH','select','BackOpacity','GoldOverlap','ParseEnemyNotetags','LvExpGauge','onerror','StatusBgType','bgsVolume','backOpacity','_target','IconXParam7','cursorUp','_pictureContainer','_stored_tpGaugeColor1','darwin','_stored_maxLvGaugeColor1','MenuBg','DisplayedParams','gaugeHeight','OUTCIRC','Sprite_Button_updateOpacity','iconHeight','isBusy','_phase','VariableJsBlock','_pictureName','isNextScene','_statusEquipWindow','MAXHP','ColorManager_loadWindowskin','SCALE_MODES','paramBase','processPointAnimationRequests','drawTextEx','setGuard','onActorChange','Smooth','resetFontSettings','tab','getTileExtendTerrainTags','setupScrollBarBitmap','Script\x20Call\x20Code:\x20\x0a%1','drawIcon','%2%1%3','ScreenResolution','EndingID','loadTitle1','itemHitImprovedAccuracy','createTextState','ParamArrow','outlineColorGauge','OUTSINE','initDigitGrouping','INOUTBOUNCE','checkCoreEngineDisplayCenter','_addShadow','PIPE','alpha','_pictureCoordinatesMode','Scene_Map_updateScene','isNwjs','_helpWindow','EXR','showPicture','_baseTexture','anchorCoreEasing','updateBgsParameters','xparamRate2','GroupDigits','maxPictures','missed','CLEAR','AudioChangeBgsPan','target','IconXParam4','Speed','OS_KEY','sin','fillText','Scene_Boot_updateDocumentTitle','MaxDuration','QoL','setEvent','slice','isSmartEventCollisionOn','createTroopNote','test','ParamName','Graphics_centerElement','Game_Party_consumeItem','tilesets','IconSParam2','setAction','drawActorNickname','_active','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','setupTileExtendTerrainTags','match','toFixed','ColSpacing','NumberBgType','ColorExpGauge2','processHandling','_startLoading','gameTitle','REPLACE','Key%1','_shakePower','SParamVocab0','PA1','loadTileset','》Comment《\x0a%1\x0a','WIN_OEM_FJ_JISHO','Bitmap_resize','Title','onTpbCharged','Game_Action_itemHit','targetPosition','AutoStretch','PictureRotateBy','processKeyboardHandling','_lastPluginCommandInterpreter','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','updateKeyText','isInputting','DIVIDE','targetY','_sellWindow','snapForBackground','itemHit','onMoveEnd','standardIconHeight','equips','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','expGaugeColor2','windowOpacity','needsUpdate','_allTextHeight','CustomParamAbb','updateScrollBarPosition','changeTextColor','11BeLLzy','_lastOrigin','IconSParam8','updateAnchor','ctrlKey','cursorDown','isTileExtended','refresh','_isWindow','visible','SwitchRandomizeRange','initCoreEngine','mhp','backgroundBitmap','Game_Interpreter_PluginCommand','meVolume','EQUALS','ItemBackColor1','Input_update','_upArrowSprite','iconWidth','Scene_Map_createMenuButton','drawGauge','〘Scrolling\x20Text〙\x0a','data/','Scene_Base_createWindowLayer','Game_Picture_x','retrieveFauxAnimation','pow','%1\x0a','ItemBgType','allowShiftScrolling','endAction','rgba(0,\x200,\x200,\x201.0)','_animationSprites','_loadingState','src','sv_enemies','2541897eODSON','SParamVocab2','_timerSprite','calcCoreEasing','Window_Base_update','setLastGamepadUsed','isScrollBarVisible','WIN_OEM_COPY','Actor-%1-%2','_startPlaying','Scene_Base_terminate','textColor','object','position','playLoad','IconXParam0','updatePictureAntiZoom','_pressed','playBuzzer','ctGaugeColor1','BuyBgType','_lastY','tileHeight','isClosed','cursorPagedown','1.4.4','ColorExpGauge1','targetBackOpacity','AllTroops','_shiftY','isOptionValid','blendFunc','_updateGamepadState','type','maxVisibleItems','playCancel','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','valueOutlineWidth','paramRate1','updatePositionCoreEngineShakeOriginal','hpGaugeColor1','GoldIcon','keypress','_pictureCoordinatesWindow','Enemy','_tilemap','operation','PERCENT','consumeItem','Flat2','pictureButtons','rowSpacing','DigitGroupingGaugeSprites','battlebacks1','Sprite_Gauge_currentValue','sparamRate','text%1','mapId','getButtonAssistLocation','_tileExtendSprites','WindowLayer_render','createMenuButton','NEAREST','isMenuButtonAssistEnabled','isOpen','_stored_crisisColor','current','targetObjects','apply','getBackgroundOpacity','GRD','Bitmap_drawTextOutline','CoreEngine','playCursor','SPACE','adjustY','TextJS','mpColor','createScrollBarSprites','createJsQuickFunction','moveRelativeToResolutionChange','Game_Interpreter_command122','playBgm','maxLvGaugeColor2','drawActorExpGauge','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','_backSprite1','initButtonHidden','OpenURL','ColorCrisis','getParameter','_onLoad','drawGameVersion','scaleX','F13','textHeight','adjustX','anchor','(\x5cd+)>','menu','XParameterFormula','_originalViewport','Window_MapName_refresh','OutlineColorGauge','parallaxes','_shouldPreventDefault','repositionCancelButtonSideButtonLayout','onKeyDownKeysF6F7','subject','join','IconXParam9','_scrollBarHorz','process_VisuMZ_CoreEngine_Notetags','IconXParam6','\x20this.','isGamepadButtonPressed','ItemMenu','EREOF','command111','StatusEquipBgType','updateData','_cache','erasePicture','SplitEscape','refreshActor','isActiveTpb','applyForcedGameTroopSettingsCoreEngine','keyboard','Game_Picture_updateRotation','ColorNormal','drawSegment','applyEasingAnglePlus','DataManager_setupNewGame','checkSmartEventCollision','_animationQueue','animations','_fauxAnimationSprites','buttonAssistText%1','isAlive','AnimationMirrorOffset','_textQueue','clearRect','setSideView','<JS\x20%1\x20%2:[\x20](.*)>','tpCostColor','NameInputMessage','SceneManager_isGameActive','Subtitle','NUMPAD6','createExtendedTileSprite','eventId','updateMain','_tileExtendTerrainTags','pitch','loadTitle2','_pageupButton','PLUS','ConvertToBase','Scene_Name_onInputOk','Window_Selectable_drawBackgroundRect','paramRate','editWindowRect','Game_Map_scrollDown','process_VisuMZ_CoreEngine_RegExp','moveMenuButtonSideButtonLayout','cursorLeft','requestPointAnimation','Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages','ParseSkillNotetags','exportAllMapStrings','ParseItemNotetags','DetachBattlePictureContainer','_stored_normalColor','_actorWindow','hit','_rate','ShowDevTools','Window_Base_createContents','clone','end','Color','exec','ColorMPCost','ColorCTGauge1','TAB','createPointAnimationTargets','backspace','Spriteset_Battle_createLowerLayer','Game_Interpreter_command111','Duration','updatePositionCoreEngineShakeRand','BTestAddedQuantity','scrollbar','_list','wholeDuration','system','LoadError','KeyItemProtect','Input_clear','Scene_Map_shouldAutosave','call','start','F24','Game_Action_setAttack','PTB','createSubSprite','markCoreEngineModified','playTestF6','tilesetNames','isPreserveTp','SystemSetBattleSystem','_isButtonHidden','_duration','updateScrollBars','result','KeyUnlisted','ActorMPColor','fillStyle','checkCacheKey','round','textBaseline','_buyWindow','windowRect','drawCircle','Name','Input_updateGamepadState','processDrawIcon','Scene_Battle_createSpriteset_detach','30gTPFaK','bind','image-rendering','setupFont','TitlePicButtons','children','tileWidth','expGaugeColor1','_dimmerSprite','BaseTexture','currencyUnit','You\x20do\x20not\x20have\x20a\x20custom\x20Input.keyMapper\x20with\x20\x22cancel\x22\x20and\x20\x22menu\x22\x20','top','shift','ExportAllTroopText','_patternHeight','updateAnglePlus','Script:\x20','BTestWeapons','transform','AudioChangeBgsVolume','endAnimation','pressed','moveCancelButtonSideButtonLayout','processCursorHomeEndTrigger','processAlwaysEscape','isAnimationPlaying','destroyContents','REC','resize','Bitmap_initialize','remove','INOUTBACK','_shakeSpeed','_itemWindow','_fauxAnimationQueue','ItemRect','SwitchToggleRange','_index','isSceneBattle','_displayX','command122','CategoryRect','Scene_Title_drawGameTitle','ExtractStrFromMap','GREATER_THAN','makeFontBigger','lineHeight','QUOTE','evaded','changeTileset','SParamVocab9','createBuffer','setSideButtonLayout','loadBitmapCoreEngine','sparamRateJS','setActorHome','commandWindowRows','initCoreEasing','windowPadding','AudioChangeBgmVolume','exportAllTroopStrings','INCUBIC','isTriggered','RepositionActors','isWindowMaskingEnabled','Window_EquipItem_isEnabled','Scene_Base_terminateAnimationClearBugFix','IconSParam1','SystemSetWindowPadding','startMove','_movementDuration','gaugeBackColor','IconSParam9','framebuffer','flush','setDisplayPos','drawBackgroundRect','_pollGamepads','animationId','StatusParamsRect','connected','_centerElementCoreEngine','ProfileBgType','CommandList','getControllerInputButtonMatch','SParamVocab8','animationNextDelay','img/%1/','stypeId','Window_Gold_refresh','index','onXhrError','numActions','ShortcutScripts','TCR','removeOnceParallelInterpreter','removePointAnimation','isItem','Game_Picture_show','xparamPlusJS','scrollUp','updateCurrentEvent','bgm','Window_ShopSell_isEnabled','enableDigitGrouping','setTileFrame','Game_Interpreter_command105','isCancelled','overallWidth','terms','actor','makeInputButtonString','OptionsMenu','SmartEventCollisionPriority','Origin','Untitled','LINEAR','buttonAssistText4','and\x20add\x20it\x20onto\x20this\x20one.','Sprite_destroy','Window_Base_createTextState','Keyboard','NUM','resetTextColor','buttons!\x20Go\x20to\x20project\x27s\x20rmmz_core.js\x20and\x20modify\x20Input.keyMapper\x20','Finish','PositionY','INBOUNCE','SceneManager_exit','Manual','picture','IconIndex','0.00','Window_NameInput_cursorDown','GoldBgType','RightMenus','AnimationPoint','setAnchor','Scene_Boot_loadSystemImages','BTestItems','END','_previousClass','OTB','helpAreaTop','isExpGaugeDrawn','PictureEasingType','_targets','buttonAssistOk','targetX','calcEasing','Game_Map_setDisplayPos','_pagedownButton','WIN_OEM_ATTN','〘Common\x20Event\x20%1:\x20%2〙\x20Start','level','NewGameBoot','_backSprite','WIN_OEM_FINISH','NewGameCommonEvent','reservePlayTestNewGameCommonEvent','Sprite_Actor_setActorHome','hideButtonFromView','getCombinedScrollingText','_tpbChargeTime','nextLevelExp','updateText','Scene_SingleLoadTransition','Plus','Scene_Menu_create','isSideButtonLayout','skillTypes','Scene_Map_updateMain','optionsWindowRect','_targetOffsetY','updatePlayTestF7','TextFmt','_width','horzJS','sparamFlatBonus','goto','makeDeepCopy','randomJS','INOUTEXPO','boxHeight','listWindowRect','keyCode','_lastX','onNameOk','_coreEngineShakeStyle','encounterStepsMinimum','bitmapHeight','_changingClass','gaugeLineHeight','printError','isDying','Scene_Battle_update','Window_NumberInput_start','_pauseSignSprite','scale','createPointAnimationSprite','TRAIT_PARAM','canAttack','encounterStep','TitleCommandList','slotWindowRect','Version','Flat1','initRotation','_commandWindow','paramMax','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','ColorDeath','paramRate2','buttonAreaHeight','<%1\x20%2:[\x20]','targetSpritePosition','isMapScrollLinked','standardIconWidth','_addSpotTile','TargetAngle','WIN_OEM_FJ_TOUROKU','Window_Base_destroyContents','makeFontSmaller','ExportCurMapText','paramWidth','TimeProgress','pan','getInputMultiButtonStrings','maxCols','createCustomParameter','updatePointAnimations','startAnimation','Window','createPointAnimationQueue','sparamPlusJS','Game_Unit_onBattleStart','If\x20you\x20don\x27t\x20want\x20this\x20option,\x20set\x20Split\x20Escape\x20option\x20back\x20to\x20false.','SkillTypeRect','drawing','HIT','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','Graphics_defaultStretchMode','addChild','guardSkillId','removeAnimationFromContainer','fontSize','canUse','Window_Scrollable_update','left','Game_Picture_initBasic','_gamepadWait','parseForcedGameTroopSettingsCoreEngine','Scene_Skill_create','ShiftR_Toggle','IconParam7','_balloonQueue','paramY','fillRect','CommandBgType','SwitchRandomizeOne','maxLevel','MULTIPLY','commandWindowRect','ControllerButtons','faceHeight','getColor','SnapshotOpacity','TPB\x20WAIT','Location','Scene_Name_create','ParseAllNotetags','_colorCache','removeAllFauxAnimations','MAXMP','CrisisRate','ExportStrFromAllMaps','version','redraw','StatusParamsBgType','_scaleX','SkillMenu','save','loadBitmap','drawCharacter','FTB','Bitmap_drawCircle','setBackgroundType','Sprite_Animation_processSoundTimings','_pointAnimationQueue','Scene_Battle_createSpriteset','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','PictureCoordinatesMode','Scene_MenuBase_createPageButtons','ctGaugeColor2','Scene_GameEnd_createBackground','INSERT','IconSet','_backSprite2','filter','CorrectSkinBleeding','makeActionList','ConvertNumberToString','Graphics','updateMotion','itemHeight','updateLastTarget','initialLevel','IconSParam3','ProfileRect','_mapX','NewGameCommonEventAll','volume','F7key','HRG','_CoreEngineSettings','padZero','savefileInfo','updatePositionCoreEngine','_troopId','EXCLAMATION','altKey','isNumpadPressed','TextStr','isMVAnimation','BgFilename1','Plus2','RepositionEnemies','WIN_OEM_JUMP','%1%2','_storedMapText','DOLLAR','_scrollBarVert','_skillTypeWindow','FontSmoothing','itemEva','Padding','_battlerName','AudioChangeBgmPan','drawParamName','Spriteset_Battle_createEnemies','targetScaleX','PictureShowIcon','Game_Action_updateLastTarget','CustomParamNames','fromCharCode','PHA','_registerKeyInput','ColorPowerUp','2KCcsPa','onBattleStart','Input_setupEventHandlers','abs','Sprite_Picture_loadBitmap','dimColor2','alignBottom','SideView','Bitmap_blt','isEventTest','_mapY','RequireFocus','maxItems','itemBackColor1','isLoopVertical','makeEncounterCount','Sprite_Picture_updateOrigin','Scene_Battle_createCancelButton','Game_BattlerBase_refresh','〘Common\x20Event\x20%1:\x20%2〙\x20End','scaleSprite','selectLast','drawAllParams','max','AGI','isBottomButtonMode','VisuMZ_2_BattleSystemSTB','isBottomHelpMode','currentClass','%1〘Choice\x20%2〙\x20%3%1','Sprite_StateIcon_updateFrame','hasEncryptedImages','itemSuccessRate','Type','_targetOpacity','dimColor1','buttonAssistKey4','BACKSPACE','itemRect','ListBgType','MINUS','numRepeats','DebugConsoleLastControllerID','_iconIndex','sellWindowRect','_goldWindow','ActorRect','ActorHPColor','Spriteset_Base_updatePosition','originalJS','changeClass','ExtDisplayedParams','drawIconBySize','_statusParamsWindow','Class-%1-%2','repositionEnemiesByResolution','Scene_TitleTransition','OUTBACK','ConvertParams','CommandRect','_stored_systemColor','initBasic','Spriteset_Base_isAnimationPlaying','_createInternalTextures','SHIFT','Game_Actor_isPreserveTp','enemies','Sprite_Button_initialize','updatePositionCoreEngineShakeVert','createKeyJS','ColorGaugeBack','doesNameContainBannedWords','_animation','MapOnceParallel','717460GHEsAa','_buttonType','removeAllPointAnimations','BottomHelp','_setupEventHandlers','home','SParameterFormula','traitObjects','getInputButtonString','F17','process_VisuMZ_CoreEngine_ControllerButtons','SceneManager_onKeyDown','RowSpacing','setBattleSystem','angle','DummyRect','_forcedTroopView','popScene','wtypeId','isAnimationOffsetXMirrored','Scene_Item_create','Troop%1','updateFrameCoreEngine','buttonY','Plus1','clearZoom','IconParam2','VisuMZ_3_EventChainReact','OUTQUINT','Spriteset_Base_destroy','targetScaleY','OUTCUBIC','updateOrigin','drawGoldItemStyle','nah','toLowerCase','VisuMZ_2_BattleSystemFTB','Game_Character_processMoveCommand','etypeId','_saveFileID','Scene_Battle_createSpritesetFix','WIN_OEM_PA2','ColorTPCost','Scene_Map_initialize','ButtonFadeSpeed','center','drawNewParam','([\x5c+\x5c-]\x5cd+)>','DELETE','KEEP','exp','showIncompleteTilesetError','PageChange','battlebacks2','MRG','scrollX','getPointAnimationLayer','mpGaugeColor1','updateClose','getLevel','initMembersCoreEngine','categoryWindowRect','displayY','STENCIL_BUFFER_BIT','ATK','updateDocumentTitle','Bitmap_gradientFillRect','pages','Window_Selectable_cursorDown','HELP','clearForcedGameTroopSettingsCoreEngine','INELASTIC','list','loadTileBitmap','buttons','_targetX','SLEEP','78674IYKQuW','_stored_deathColor','ImprovedAccuracySystem','_startDecrypting','mainCommandWidth','buttonAssistKey1','isCollidedWithEvents','ParamChange','maxBattleMembers','coreEngineRepositionEnemies','buttonAssistSwitch','BKSP','SUBTRACT','_textPopupWindow','updatePosition','EncounterRateMinimum','setupNewGame','onlyfilename','platform','INOUTQUINT','ButtonHeight','HYPHEN_MINUS','enabled','levelUp','ERROR!\x0a\x0aCore\x20Engine\x20>\x20Plugin\x20Parameters\x20>\x20Button\x20Assist\x20>\x20Split\x20Escape\x0a\x0a','_eventId','Game_Event_start','_onKeyPress','constructor','ModernControls','tileset','updateRotation','scrollRight','_hideTileShadows','_subject','height','option','_cacheScaleX','BoxMargin','scrollbarHeight','setupCoreEngine','SellRect','Total','playTestF7','anglePlus','DETACH_PICTURE_CONTAINER','command357','getLastUsedGamepadType','drawText','Game_Troop_setup','defaultInputMode','isGameActive','switchModes','layoutSettings','buttonAssistCancel','updatePadding','isTpb','FadeSpeed','F20','WIN_OEM_CUSEL','ColorMPGauge1','font-smooth','crisisColor','_closing','createCommandWindow','bitmapWidth','_forcedBattleSys','MRF','BarOffset','isAutoColorAffected','Window_NameInput_processTouch','PDR','Game_Screen_initialize','QUESTION_MARK','animationBaseDelay','XParamVocab0','_logWindow','loadSystem','damageColor','_profileWindow','Game_Picture_calcEasing','EISU','ExportStrFromAllTroops','createTileExtendSprites','XParamVocab6','_encounterCount','Sprite_Gauge_gaugeRate','maxScrollX','_scaleY','Scene_Map_createSpriteset_detach','substring','ScreenShake','traitsPi','_colorTone','_maxDigits','saveViewport','Sprite_AnimationMV_updatePosition','CLOSE_PAREN','PictureID','_name','framesPerChar','trim','_paramPlus','Sprite_Battler_startMove','thickness','updateEffekseer','setEasingType','prototype','quit','applyCoreEasing','Spriteset_Base_initialize','movePageButtonSideButtonLayout','Window_Base_drawCharacter','sparamFlat2','_displayY','getBattleSystem','sparamPlus','vertJS','Game_Action_itemEva','_coreEasing','ShowItemBackground','_bgsBuffer','setMoveEasingType','offset','_displayedPassageError','offColor','expParams','removeTileExtendSprites','stretch','%1〘End\x20Choice\x20Selection〙%1','itypeId','_statusWindow','loadIconBitmap','_spriteset','log','isAnimationForEach','optSideView','processKeyboardEnd','axes','scaleY','blockWidth','_currentMap','SParamVocab1','_origin','Scene_Load','outbounce','addOnceParallelInterpreter','MapNameTextCode','FontSize','playOnceParallelInterpreter','ARRAYJSON','indexOf','INOUTSINE','Game_Picture_initRotation','Bitmap_strokeRect','randomInt','integer','MenuLayout','CheckSplitEscape','levelUpRecovery','framesMin','innerWidth','updateDuration','SCROLLBAR','_numberWindow','CTRL','SystemLoadAudio','requestFauxAnimation','useDigitGroupingEx','VisuMZ_2_BattleSystemPTB','DimColor1','CreateBattleSystemID','description','setAttack','isHandled','updateScrollBarVisibility','_centerCameraCheck','getLastPluginCommandInterpreter','style','sqrt','gold','StatusRect','process_VisuMZ_CoreEngine_jsQuickFunctions','PixelateImageRendering','F16','WIN_OEM_CLEAR','destroyScrollBarBitmaps','keys','yScrollLinkedOffset','setAnglePlusData','processFauxAnimationRequests','adjustSprite','Spriteset_Base_update','_downArrowSprite','removeChild','PERIOD','ColorCTGauge2','inbounce','startShake','_drawTextShadow','jsQuickFunc','ASTERISK','ShopMenu','Center','_battleField','createContents','createSpriteset','Mute','XParamVocab7','tpGaugeColor2','BlendMode','VisuMZ_1_BattleCore','META','BattleManager_processEscape','_currentBgm','_playTestFastMode','DigitGroupingLocale','_screenX','StateIconsNonFrame','Game_Picture_angle','currentLevelExp','BTB','ShiftT_Toggle','isGamepadTriggered','updateBattleVariables','clear','drawCurrencyValue','titles2','textSizeEx','startAutoNewGame','_stored_powerDownColor','param','centerSprite','CustomParam','isArrowPressed','ApplyEasing','SkillTypeBgType','uiAreaWidth','catchNormalError','WIN_OEM_BACKTAB','_moveEasingType','showPointAnimations','xdg-open','ctrl','Mirror','Scene_Options_create','Pixelated','drawGameSubtitle','Weapon-%1-%2','_tpbState','_mainSprite','Gold','allTiles','Rate2','maxTp','Scene_Map_createSpriteset','Exported_Script_%1.txt','isUseModernControls','Symbol','isOpening','drawActorLevel','mpCostColor','refreshSpritesetForExtendedTiles','removeFauxAnimation','consumable','Game_Picture_y','_onKeyDown','textWidth','_cancelButton','defineProperty','_bypassCanCounterCheck','Game_Interpreter_updateWaitMode','cancelShowButton','SELECT','ParseClassNotetags','setCommonEvent','loadPicture','setup','up2','ATTN','Scene_MenuBase_mainAreaHeight','this.paramBase(1)','xparamPlus2','default','button','TextPopupShow','cursorPageup','updateDashToggle','updateShadow','centerX','restore','%1/','easingType','isPointAnimationPlaying','escape','EditRect','xparam','_actor','openness','createTitleButtons','profileWindowRect','playEscape','_data','IconXParam1','isLoopHorizontal','_height','buyWindowRect','ESC','PAUSE','buttonAssistText3','285530tlwPfg','Window_Base_drawIcon','expRate','_anglePlus','helpWindowRect','hide','stringKeyMap','paramBaseAboveLevel99','_buttonAssistWindow','makeCommandList','$dataMap','ARRAYNUM','EVA','valueOutlineColor','_text','setWindowPadding','_mp','processKeyboardDelete','Scene_Equip_create','skillId','ExtJS','_playtestF7Looping','_mode','DashToggleR','CONVERT','item','Renderer','events','SETTINGS','ETB','PreserveNumbers','setLastPluginCommandInterpreter','mainAreaTop','note','playTestShiftR','buttonAssistText2','RegExp','dropItems','RPGMAKER_VERSION','process_VisuMZ_CoreEngine_Settings','Game_Battler_initTpbChargeTime','recoverAll','Window_NameInput_cursorPageup','ParseStateNotetags','length','CLOSE_BRACKET','value','exit','Game_Picture_move','Game_Unit_onBattleEnd','Game_Picture_updateMove','charging','UpdatePictureCoordinates','_clickHandler','SEMICOLON','createFauxAnimation','CategoryBgType','numberWindowRect','resetBattleSystem','width','startNormalGame','SystemLoadImages','_stored_ctGaugeColor1','Bitmap_drawText','getGamepads','KeySHIFT','catchUnknownError','processKeyboardHome','initRotationCoreEngine','Param','InputBgType','createDimmerSprite','currentCommand','CEV','pop','EVAL','enable','_centerElement','isCursorMovable','helpAreaBottom','updateOnceParallelInterpreters','opacity','setViewport','prepareNextScene','_srcBitmap','setColorTone','powerUpColor','xparamRate1','paramMaxJS','characters','ParseWeaponNotetags','OutlineColorDmg','pageup','QwertyLayout','DetachMapPictureContainer','inputWindowRect','mainAreaBottom','_targetY','NUMPAD2','helpAreaHeight','ColorMaxLvGauge1','createLowerLayer','Rate1','buttonAssistKey5','_optionsWindow','runCombinedScrollingTextAsCode','gradientFillRect','Window_NameInput_initialize','addQueue','(\x5cd+\x5c.?\x5cd+)>','_inputSpecialKeyCode','map','duration','203VEkAmo','imageSmoothingEnabled','IconParam0','setCoreEngineScreenShakeStyle','loadGameImagesCoreEngine','openURL','Sprite_AnimationMV_processTimingData','TGR','DocumentTitleFmt','createTilemap','drawGameTitle','_offsetY','updateFauxAnimations','none','BattleManager_update','VisuMZ_2_BattleSystemOTB','_currentBgs','_lastIconIndex','add','displayX','isFullDocumentTitle','AutoScrollLockX','seek','State-%1-%2','contentsOpacity','updateMove','BarThickness','offsetY','buttonAssistKey3','Armor-%1-%2','floor','attackSkillId','forceStencil','processCursorMoveModernControls','Sprite_Animation_setViewport','F18','arePageButtonsEnabled','_editWindow','_dummyWindow','buttonAssistWindowButtonRect','Input_pollGamepads','maxTurns','contains','_forcedBattleGridSystem','BattleSystem','right','areButtonsOutsideMainUI','Game_Map_setup','ShowJS','catchException','setClickHandler','_stored_ctGaugeColor2','DOUBLE_QUOTE','writeFile','ActorTPColor','processDigitChange','itemPadding','code','gainGold','updateBgmParameters','FINAL','AMPERSAND','StatusMenu','([\x5c+\x5c-]\x5cd+)([%％])>','keys\x20for\x20both\x20\x22cancel\x22\x20and\x20\x22menu\x22!\x0a\x0a','bitmap','clearTp','Game_Event_isCollidedWithEvents','performEscape','Scene_Shop_create','Page','mainAreaHeightSideButtonLayout','contents','SideButtons','Scene_MenuBase_createCancelButton','getCustomBackgroundSettings','_offsetX','_scrollDuration','lastAnimationSprite','drawItem','targets','VariableEvalReference','LevelUpFullHp','addAnimationSpriteToContainer','pointX','Input_onKeyDown','mainFontSize','_targetScaleX','faceWidth','loading','normalColor','VOLUME_MUTE','ScaleY','numberShowButton','EXSEL','PRINTSCREEN','Scene_Map_updateMainMultiply','78656Lmyrhg','X:\x20%1','DimColor2','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','_destroyCanvas','_defaultStretchMode','disable','setHandler','HelpRect','_listWindow','INEXPO','dashToggle','ceil','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','parse','ColorMPGauge2','pixelated','processBack','ImgLoad','DATABASE','NUMPAD1','drawValue','BACK_SLASH','command105','playCursorSound','LUK','_lastGamepad','CodeJS','isItemStyle','Bitmap_measureTextWidth','SParamVocab3','paramX','deselect','registerCommand','Scene_Status_create','SParamVocab6','WIN_OEM_PA3','F19','DisplayLockX','process_VisuMZ_CoreEngine_Functions','name','updatePositionCoreEngineShakeHorz','parameters','inBattle','BannedWords','createBackground','colSpacing','_pointAnimationSprites','xparamRate','catchLoadError','_targetAnchor','adjustPictureAntiZoom','this.paramBase(4)','ZOOM','OPEN_PAREN','setupButtonImage','createButtonAssistWindow','WIN_OEM_FJ_MASSHOU','members','_stored_tpGaugeColor2','_stored_hpGaugeColor1','UNDERSCORE','_backgroundFilter','Unnamed','filters','active'];_0x579a=function(){return _0x300cf6;};return _0x579a();};VisuMZ['CoreEngine']['Window_ShopSell_isEnabled']=Window_ShopSell[_0x4a5d62(0x5da)][_0x4a5d62(0x7f7)],Window_ShopSell[_0x4a5d62(0x5da)][_0x4a5d62(0x7f7)]=function(_0x350b72){const _0xd8dc0f=_0x4a5d62;return VisuMZ[_0xd8dc0f(0x2df)][_0xd8dc0f(0x7d0)]['QoL'][_0xd8dc0f(0x35c)]&&DataManager['isKeyItem'](_0x350b72)?![]:VisuMZ[_0xd8dc0f(0x2df)][_0xd8dc0f(0x3e3)][_0xd8dc0f(0x35f)](this,_0x350b72);},Window_NumberInput[_0x4a5d62(0x5da)]['isUseModernControls']=function(){return![];};VisuMZ[_0x4a5d62(0x2df)]['Settings'][_0x4a5d62(0x994)]['EnableNumberInput']&&(VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x440)]=Window_NumberInput[_0x4a5d62(0x5da)][_0x4a5d62(0x360)],Window_NumberInput['prototype'][_0x4a5d62(0x360)]=function(){const _0x24ee0f=_0x4a5d62;VisuMZ[_0x24ee0f(0x2df)]['Window_NumberInput_start'][_0x24ee0f(0x35f)](this),this[_0x24ee0f(0x1e4)](this[_0x24ee0f(0x5cd)]-0x1),Input[_0x24ee0f(0x650)]();},VisuMZ['CoreEngine'][_0x4a5d62(0x940)]=Window_NumberInput[_0x4a5d62(0x5da)][_0x4a5d62(0x74d)],Window_NumberInput[_0x4a5d62(0x5da)][_0x4a5d62(0x74d)]=function(){const _0x423986=_0x4a5d62;if(!this['isOpenAndActive']())return;if(Input['isNumpadPressed']())this[_0x423986(0x7df)]();else{if(Input['isSpecialCode'](_0x423986(0x351)))this[_0x423986(0x8b2)]();else{if(Input['_inputSpecialKeyCode']===0x2e)this[_0x423986(0x6b6)]();else{if(Input['_inputSpecialKeyCode']===0x24)this[_0x423986(0x6e8)]();else Input[_0x423986(0x713)]===0x23?this[_0x423986(0x5f8)]():VisuMZ[_0x423986(0x2df)][_0x423986(0x940)][_0x423986(0x35f)](this);}}}},Window_NumberInput[_0x4a5d62(0x5da)][_0x4a5d62(0x1a6)]=function(){const _0x88a773=_0x4a5d62;if(!this[_0x88a773(0x6f3)]())return;Input['isNumpadPressed']()?this[_0x88a773(0x7df)]():Window_Selectable[_0x88a773(0x5da)][_0x88a773(0x1a6)][_0x88a773(0x35f)](this);},Window_NumberInput[_0x4a5d62(0x5da)][_0x4a5d62(0x393)]=function(){},Window_NumberInput[_0x4a5d62(0x5da)][_0x4a5d62(0x7df)]=function(){const _0x3f5b85=_0x4a5d62;if(String(this['_number'])[_0x3f5b85(0x6d1)]>=this[_0x3f5b85(0x5cd)])return;const _0x5aa96c=Number(String(this['_number'])+Input[_0x3f5b85(0x892)]);if(isNaN(_0x5aa96c))return;this[_0x3f5b85(0x7fa)]=_0x5aa96c;const _0x158395='9'['repeat'](this['_maxDigits']);this[_0x3f5b85(0x7fa)]=this[_0x3f5b85(0x7fa)]['clamp'](0x0,_0x158395),Input[_0x3f5b85(0x650)](),this[_0x3f5b85(0x278)](),SoundManager['playCursor'](),this['select'](this[_0x3f5b85(0x5cd)]-0x1);},Window_NumberInput[_0x4a5d62(0x5da)][_0x4a5d62(0x8b2)]=function(){const _0x3a0e31=_0x4a5d62;this[_0x3a0e31(0x7fa)]=Number(String(this[_0x3a0e31(0x7fa)])[_0x3a0e31(0x237)](0x0,-0x1)),this[_0x3a0e31(0x7fa)]=Math['max'](0x0,this[_0x3a0e31(0x7fa)]),Input['clear'](),this[_0x3a0e31(0x278)](),SoundManager[_0x3a0e31(0x2e0)](),this[_0x3a0e31(0x1e4)](this[_0x3a0e31(0x5cd)]-0x1);},Window_NumberInput['prototype'][_0x4a5d62(0x6b6)]=function(){const _0x53550e=_0x4a5d62;this[_0x53550e(0x7fa)]=Number(String(this[_0x53550e(0x7fa)])[_0x53550e(0x5c9)](0x1)),this['_number']=Math[_0x53550e(0x4ef)](0x0,this[_0x53550e(0x7fa)]),Input['clear'](),this[_0x53550e(0x278)](),SoundManager['playCursor'](),this['select'](this[_0x53550e(0x5cd)]-0x1);},Window_NumberInput[_0x4a5d62(0x5da)]['processKeyboardHome']=function(){const _0x75558b=_0x4a5d62;if(this[_0x75558b(0x3d6)]()===0x0)return;Input['clear'](),this[_0x75558b(0x278)](),SoundManager[_0x75558b(0x2e0)](),this[_0x75558b(0x1e4)](0x0);},Window_NumberInput['prototype']['processKeyboardEnd']=function(){const _0xafdf8b=_0x4a5d62;if(this[_0xafdf8b(0x3d6)]()===this[_0xafdf8b(0x5cd)]-0x1)return;Input[_0xafdf8b(0x650)](),this['refresh'](),SoundManager[_0xafdf8b(0x2e0)](),this[_0xafdf8b(0x1e4)](this['_maxDigits']-0x1);});function _0x1f9c(_0x100fd7,_0x432855){const _0x579a2e=_0x579a();return _0x1f9c=function(_0x1f9cee,_0x1148a6){_0x1f9cee=_0x1f9cee-0x19b;let _0x15be56=_0x579a2e[_0x1f9cee];return _0x15be56;},_0x1f9c(_0x100fd7,_0x432855);};VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x2fd)]=Window_MapName[_0x4a5d62(0x5da)][_0x4a5d62(0x278)],Window_MapName[_0x4a5d62(0x5da)][_0x4a5d62(0x278)]=function(){const _0x1f759b=_0x4a5d62;VisuMZ[_0x1f759b(0x2df)][_0x1f759b(0x7d0)][_0x1f759b(0x235)][_0x1f759b(0x602)]?this[_0x1f759b(0x86d)]():VisuMZ['CoreEngine'][_0x1f759b(0x2fd)]['call'](this);},Window_MapName[_0x4a5d62(0x5da)][_0x4a5d62(0x86d)]=function(){const _0x42a7b4=_0x4a5d62;this[_0x42a7b4(0x75e)][_0x42a7b4(0x650)]();if($gameMap[_0x42a7b4(0x989)]()){const _0x421079=this['innerWidth'];this[_0x42a7b4(0x951)](0x0,0x0,_0x421079,this['lineHeight']());const _0x969495=this[_0x42a7b4(0x653)]($gameMap[_0x42a7b4(0x989)]())[_0x42a7b4(0x6e0)];this['drawTextEx']($gameMap[_0x42a7b4(0x989)](),Math[_0x42a7b4(0x734)]((_0x421079-_0x969495)/0x2),0x0);}},Window_TitleCommand['_commandList']=VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x7d0)][_0x4a5d62(0x447)],Window_TitleCommand[_0x4a5d62(0x5da)][_0x4a5d62(0x6ae)]=function(){const _0x5ce7d2=_0x4a5d62;this[_0x5ce7d2(0x8d7)]();},Window_TitleCommand[_0x4a5d62(0x5da)][_0x4a5d62(0x8d7)]=function(){const _0x4ad672=_0x4a5d62;for(const _0x571208 of Window_TitleCommand[_0x4ad672(0x978)]){if(_0x571208[_0x4ad672(0x746)][_0x4ad672(0x35f)](this)){const _0x33309f=_0x571208['Symbol'];let _0x299187=_0x571208[_0x4ad672(0x4be)];if(['',_0x4ad672(0x3ef)][_0x4ad672(0x1cd)](_0x299187))_0x299187=_0x571208['TextJS'][_0x4ad672(0x35f)](this);const _0x24cdf1=_0x571208[_0x4ad672(0x90f)][_0x4ad672(0x35f)](this),_0x22fc62=_0x571208[_0x4ad672(0x6b9)]['call'](this);this['addCommand'](_0x299187,_0x33309f,_0x24cdf1,_0x22fc62),this[_0x4ad672(0x77e)](_0x33309f,_0x571208[_0x4ad672(0x1a7)][_0x4ad672(0x37c)](this,_0x22fc62));}}},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x829)]=Window_TitleCommand[_0x4a5d62(0x5da)][_0x4a5d62(0x4ed)],Window_TitleCommand[_0x4a5d62(0x5da)][_0x4a5d62(0x4ed)]=function(){const _0x3807f7=_0x4a5d62;VisuMZ[_0x3807f7(0x2df)][_0x3807f7(0x829)][_0x3807f7(0x35f)](this);if(!Window_TitleCommand[_0x3807f7(0x8dd)])return;const _0x133e28=this['findSymbol'](Window_TitleCommand['_lastCommandSymbol']),_0x2648ec=Math['floor'](this[_0x3807f7(0x2b9)]()/0x2)-0x1;this[_0x3807f7(0x859)](_0x133e28),this[_0x3807f7(0x763)]>0x1&&(this[_0x3807f7(0x763)]=0x1,this['updateSmoothScroll']()),this['setTopRow'](_0x133e28-_0x2648ec);},Window_GameEnd[_0x4a5d62(0x978)]=VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x7d0)][_0x4a5d62(0x60c)][_0x4a5d62(0x802)][_0x4a5d62(0x3cf)],Window_GameEnd[_0x4a5d62(0x5da)][_0x4a5d62(0x6ae)]=function(){const _0x3d7d8d=_0x4a5d62;this[_0x3d7d8d(0x8d7)]();},Window_GameEnd[_0x4a5d62(0x5da)]['makeCoreEngineCommandList']=function(){const _0x590dcf=_0x4a5d62;for(const _0x1634ef of Window_GameEnd['_commandList']){if(_0x1634ef[_0x590dcf(0x746)][_0x590dcf(0x35f)](this)){const _0x10c892=_0x1634ef[_0x590dcf(0x671)];let _0x102482=_0x1634ef['TextStr'];if(['',_0x590dcf(0x3ef)][_0x590dcf(0x1cd)](_0x102482))_0x102482=_0x1634ef[_0x590dcf(0x2e3)][_0x590dcf(0x35f)](this);const _0x39b86d=_0x1634ef[_0x590dcf(0x90f)][_0x590dcf(0x35f)](this),_0x1666db=_0x1634ef[_0x590dcf(0x6b9)]['call'](this);this['addCommand'](_0x102482,_0x10c892,_0x39b86d,_0x1666db),this[_0x590dcf(0x77e)](_0x10c892,_0x1634ef[_0x590dcf(0x1a7)]['bind'](this,_0x1666db));}}};function Window_ButtonAssist(){const _0x28eb29=_0x4a5d62;this[_0x28eb29(0x96b)](...arguments);}Window_ButtonAssist[_0x4a5d62(0x5da)]=Object[_0x4a5d62(0x963)](Window_Base['prototype']),Window_ButtonAssist[_0x4a5d62(0x5da)][_0x4a5d62(0x58b)]=Window_ButtonAssist,Window_ButtonAssist[_0x4a5d62(0x5da)][_0x4a5d62(0x96b)]=function(_0x5d9569){const _0x3f2d19=_0x4a5d62;this[_0x3f2d19(0x69d)]={},Window_Base[_0x3f2d19(0x5da)][_0x3f2d19(0x96b)][_0x3f2d19(0x35f)](this,_0x5d9569),this[_0x3f2d19(0x49a)](VisuMZ[_0x3f2d19(0x2df)]['Settings'][_0x3f2d19(0x8a1)]['BgType']||0x0),this[_0x3f2d19(0x278)]();},Window_ButtonAssist[_0x4a5d62(0x5da)]['lineHeight']=function(){const _0x3854e1=_0x4a5d62;return this[_0x3854e1(0x915)]||Window_Base[_0x3854e1(0x5da)]['lineHeight']['call'](this);},Window_ButtonAssist['prototype'][_0x4a5d62(0x3a9)]=function(){const _0x529326=_0x4a5d62;this['contents']['fontSize']<=0x60&&(this['contents'][_0x529326(0x471)]+=0x6);},Window_ButtonAssist['prototype'][_0x4a5d62(0x45a)]=function(){const _0xd3090e=_0x4a5d62;this[_0xd3090e(0x75e)][_0xd3090e(0x471)]>=0x18&&(this['contents'][_0xd3090e(0x471)]-=0x6);},Window_ButtonAssist[_0x4a5d62(0x5da)][_0x4a5d62(0x8fa)]=function(){const _0x1e2c8a=_0x4a5d62;Window_Base[_0x1e2c8a(0x5da)][_0x1e2c8a(0x8fa)][_0x1e2c8a(0x35f)](this),this[_0x1e2c8a(0x25f)]();},Window_ButtonAssist['prototype'][_0x4a5d62(0x5a6)]=function(){const _0x2967db=_0x4a5d62;this[_0x2967db(0x8ce)]=SceneManager['_scene']['getButtonAssistLocation']()!==_0x2967db(0x68b)?0x0:0x8;},Window_ButtonAssist[_0x4a5d62(0x5da)]['updateKeyText']=function(){const _0x3913e9=_0x4a5d62,_0xb11b3e=SceneManager[_0x3913e9(0x7d2)];for(let _0x16f691=0x1;_0x16f691<=0x5;_0x16f691++){if(this['_data'][_0x3913e9(0x1c2)[_0x3913e9(0x807)](_0x16f691)]!==_0xb11b3e[_0x3913e9(0x899)[_0x3913e9(0x807)](_0x16f691)]())return this[_0x3913e9(0x278)]();if(this[_0x3913e9(0x69d)]['text%1'[_0x3913e9(0x807)](_0x16f691)]!==_0xb11b3e[_0x3913e9(0x320)['format'](_0x16f691)]())return this[_0x3913e9(0x278)]();}},Window_ButtonAssist['prototype']['refresh']=function(){const _0x7d1116=_0x4a5d62;this['contents'][_0x7d1116(0x650)]();for(let _0x3bbcc5=0x1;_0x3bbcc5<=0x5;_0x3bbcc5++){this['drawSegment'](_0x3bbcc5);}},Window_ButtonAssist[_0x4a5d62(0x5da)][_0x4a5d62(0x319)]=function(_0x82b819){const _0x3931a6=_0x4a5d62,_0x4a8ce3=this[_0x3931a6(0x610)]/0x5,_0x2e21fd=SceneManager[_0x3931a6(0x7d2)],_0x8f988b=_0x2e21fd[_0x3931a6(0x899)[_0x3931a6(0x807)](_0x82b819)](),_0x3cbbc4=_0x2e21fd['buttonAssistText%1'[_0x3931a6(0x807)](_0x82b819)]();this[_0x3931a6(0x69d)][_0x3931a6(0x1c2)[_0x3931a6(0x807)](_0x82b819)]=_0x8f988b,this[_0x3931a6(0x69d)][_0x3931a6(0x2cf)[_0x3931a6(0x807)](_0x82b819)]=_0x3cbbc4;if(_0x8f988b==='')return;if(_0x3cbbc4==='')return;const _0x5e3228=_0x2e21fd[_0x3931a6(0x931)['format'](_0x82b819)](),_0x22d9fe=this[_0x3931a6(0x74e)](),_0xc46a00=_0x4a8ce3*(_0x82b819-0x1)+_0x22d9fe+_0x5e3228,_0x28b609=VisuMZ[_0x3931a6(0x2df)]['Settings'][_0x3931a6(0x8a1)][_0x3931a6(0x42b)];this[_0x3931a6(0x205)](_0x28b609[_0x3931a6(0x807)](_0x8f988b,_0x3cbbc4),_0xc46a00,0x0,_0x4a8ce3-_0x22d9fe*0x2);},VisuMZ[_0x4a5d62(0x2df)]['Game_Interpreter_updateWaitMode']=Game_Interpreter[_0x4a5d62(0x5da)]['updateWaitMode'],Game_Interpreter['prototype']['updateWaitMode']=function(){const _0x317794=_0x4a5d62;if($gameTemp[_0x317794(0x21e)]!==undefined)return VisuMZ['CoreEngine'][_0x317794(0x6d9)]();return VisuMZ['CoreEngine'][_0x317794(0x67e)][_0x317794(0x35f)](this);},VisuMZ[_0x4a5d62(0x2df)]['UpdatePictureCoordinates']=function(){const _0x4b2403=_0x4a5d62,_0x58d90a=$gameTemp[_0x4b2403(0x21e)]||0x0;(_0x58d90a<0x0||_0x58d90a>0x64||TouchInput[_0x4b2403(0x3e7)]()||Input[_0x4b2403(0x3ba)](_0x4b2403(0x1da)))&&($gameTemp['_pictureCoordinatesMode']=undefined,Input[_0x4b2403(0x650)](),TouchInput['clear']());const _0x5028e5=$gameScreen[_0x4b2403(0x3fe)](_0x58d90a);return _0x5028e5&&(_0x5028e5['_x']=TouchInput['_x'],_0x5028e5['_y']=TouchInput['_y']),VisuMZ['CoreEngine'][_0x4b2403(0x858)](),$gameTemp[_0x4b2403(0x21e)]!==undefined;},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x858)]=function(){const _0x477f16=_0x4a5d62,_0x3fd0e4=SceneManager['_scene'];if(!_0x3fd0e4)return;!_0x3fd0e4['_pictureCoordinatesWindow']&&(SoundManager[_0x477f16(0x2a5)](),_0x3fd0e4[_0x477f16(0x2c2)]=new Window_PictureCoordinates(),_0x3fd0e4[_0x477f16(0x46e)](_0x3fd0e4[_0x477f16(0x2c2)])),$gameTemp[_0x477f16(0x21e)]===undefined&&(SoundManager[_0x477f16(0x2ba)](),_0x3fd0e4[_0x477f16(0x631)](_0x3fd0e4['_pictureCoordinatesWindow']),_0x3fd0e4[_0x477f16(0x2c2)]=undefined);};function Window_PictureCoordinates(){const _0xec4434=_0x4a5d62;this[_0xec4434(0x96b)](...arguments);}Window_PictureCoordinates[_0x4a5d62(0x5da)]=Object[_0x4a5d62(0x963)](Window_Base[_0x4a5d62(0x5da)]),Window_PictureCoordinates[_0x4a5d62(0x5da)]['constructor']=Window_PictureCoordinates,Window_PictureCoordinates[_0x4a5d62(0x5da)][_0x4a5d62(0x96b)]=function(){const _0x1f55a0=_0x4a5d62;this[_0x1f55a0(0x272)]=_0x1f55a0(0x544),this[_0x1f55a0(0x436)]=_0x1f55a0(0x544),this[_0x1f55a0(0x2ac)]=_0x1f55a0(0x544);const _0x223e37=this['windowRect']();Window_Base[_0x1f55a0(0x5da)]['initialize'][_0x1f55a0(0x35f)](this,_0x223e37),this[_0x1f55a0(0x49a)](0x2);},Window_PictureCoordinates[_0x4a5d62(0x5da)][_0x4a5d62(0x375)]=function(){const _0x2e6470=_0x4a5d62;let _0x6d6784=0x0,_0x54e286=Graphics['height']-this[_0x2e6470(0x3aa)](),_0x4af40e=Graphics[_0x2e6470(0x6e0)],_0x236efa=this['lineHeight']();return new Rectangle(_0x6d6784,_0x54e286,_0x4af40e,_0x236efa);},Window_PictureCoordinates[_0x4a5d62(0x5da)][_0x4a5d62(0x5a6)]=function(){const _0x1b6cc9=_0x4a5d62;this[_0x1b6cc9(0x8ce)]=0x0;},Window_PictureCoordinates['prototype'][_0x4a5d62(0x8fa)]=function(){const _0x1d418=_0x4a5d62;Window_Base[_0x1d418(0x5da)][_0x1d418(0x8fa)][_0x1d418(0x35f)](this),this[_0x1d418(0x30f)]();},Window_PictureCoordinates['prototype'][_0x4a5d62(0x30f)]=function(){const _0xc3376e=_0x4a5d62;if(!this[_0xc3376e(0x26c)]())return;this[_0xc3376e(0x278)]();},Window_PictureCoordinates[_0x4a5d62(0x5da)][_0x4a5d62(0x26c)]=function(){const _0x3d1e49=_0x4a5d62,_0x42905c=$gameTemp[_0x3d1e49(0x21e)],_0x52282a=$gameScreen[_0x3d1e49(0x3fe)](_0x42905c);return _0x52282a?this[_0x3d1e49(0x272)]!==_0x52282a[_0x3d1e49(0x5fe)]||this[_0x3d1e49(0x436)]!==_0x52282a['_x']||this['_lastY']!==_0x52282a['_y']:![];},Window_PictureCoordinates[_0x4a5d62(0x5da)][_0x4a5d62(0x278)]=function(){const _0x855b88=_0x4a5d62;this[_0x855b88(0x75e)][_0x855b88(0x650)]();const _0x3c8ab8=$gameTemp['_pictureCoordinatesMode'],_0xa2c697=$gameScreen[_0x855b88(0x3fe)](_0x3c8ab8);if(!_0xa2c697)return;this[_0x855b88(0x272)]=_0xa2c697[_0x855b88(0x5fe)],this[_0x855b88(0x436)]=_0xa2c697['_x'],this[_0x855b88(0x2ac)]=_0xa2c697['_y'];const _0x5135fc=ColorManager[_0x855b88(0x4e5)]();this[_0x855b88(0x75e)]['fillRect'](0x0,0x0,this[_0x855b88(0x610)],this[_0x855b88(0x915)],_0x5135fc);const _0x19a988='\x20Origin:\x20%1'[_0x855b88(0x807)](_0xa2c697[_0x855b88(0x5fe)]===0x0?_0x855b88(0x85f):_0x855b88(0x63a)),_0x3f28d0=_0x855b88(0x778)[_0x855b88(0x807)](_0xa2c697['_x']),_0x5d488a=_0x855b88(0x1b3)[_0x855b88(0x807)](_0xa2c697['_y']),_0x30fdf5='%1:\x20Exit\x20'[_0x855b88(0x807)](TextManager[_0x855b88(0x52a)]('cancel'));let _0x2e9472=Math[_0x855b88(0x734)](this[_0x855b88(0x610)]/0x4);this[_0x855b88(0x59f)](_0x19a988,_0x2e9472*0x0,0x0,_0x2e9472),this['drawText'](_0x3f28d0,_0x2e9472*0x1,0x0,_0x2e9472,_0x855b88(0x54f)),this[_0x855b88(0x59f)](_0x5d488a,_0x2e9472*0x2,0x0,_0x2e9472,'center');const _0x216668=this[_0x855b88(0x653)](_0x30fdf5)[_0x855b88(0x6e0)],_0x594b34=this[_0x855b88(0x610)]-_0x216668;this[_0x855b88(0x205)](_0x30fdf5,_0x594b34,0x0,_0x216668);};function Window_TextPopup(){const _0x598985=_0x4a5d62;this[_0x598985(0x96b)](...arguments);}Window_TextPopup[_0x4a5d62(0x5da)]=Object[_0x4a5d62(0x963)](Window_Base[_0x4a5d62(0x5da)]),Window_TextPopup[_0x4a5d62(0x5da)][_0x4a5d62(0x58b)]=Window_TextPopup,Window_TextPopup['SETTINGS']={'framesPerChar':VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x7d0)]['Window'][_0x4a5d62(0x8a7)]??1.5,'framesMin':VisuMZ['CoreEngine'][_0x4a5d62(0x7d0)][_0x4a5d62(0x464)]['MinDuration']??0x5a,'framesMax':VisuMZ['CoreEngine']['Settings'][_0x4a5d62(0x464)][_0x4a5d62(0x234)]??0x12c},Window_TextPopup[_0x4a5d62(0x5da)][_0x4a5d62(0x96b)]=function(){const _0x33480a=_0x4a5d62,_0x415935=new Rectangle(0x0,0x0,0x1,0x1);Window_Base[_0x33480a(0x5da)]['initialize'][_0x33480a(0x35f)](this,_0x415935),this[_0x33480a(0x699)]=0x0,this[_0x33480a(0x6b3)]='',this[_0x33480a(0x323)]=[],this[_0x33480a(0x8f2)]=0x0;},Window_TextPopup[_0x4a5d62(0x5da)][_0x4a5d62(0x5b4)]=function(){return!![];},Window_TextPopup['prototype'][_0x4a5d62(0x711)]=function(_0x23be3a){const _0xad4e2a=_0x4a5d62;if(this['_textQueue'][this[_0xad4e2a(0x323)]['length']-0x1]===_0x23be3a)return;this[_0xad4e2a(0x323)][_0xad4e2a(0x98c)](_0x23be3a),SceneManager[_0xad4e2a(0x7d2)]['addChild'](this);},Window_TextPopup['prototype']['update']=function(){const _0x4e95e6=_0x4a5d62;Window_Base[_0x4e95e6(0x5da)][_0x4e95e6(0x8fa)][_0x4e95e6(0x35f)](this),this['updateText'](),this[_0x4e95e6(0x611)]();},Window_TextPopup[_0x4a5d62(0x5da)][_0x4a5d62(0x421)]=function(){const _0x28865a=_0x4a5d62;if(this[_0x28865a(0x6b3)]!=='')return;if(this[_0x28865a(0x323)][_0x28865a(0x6d1)]<=0x0)return;if(!this['isClosed']())return;this[_0x28865a(0x6b3)]=this[_0x28865a(0x323)][_0x28865a(0x388)]();const _0x2e58be=Window_TextPopup[_0x28865a(0x6c1)],_0xe9b879=Math[_0x28865a(0x783)](this[_0x28865a(0x6b3)]['length']*_0x2e58be[_0x28865a(0x5d3)]);this[_0x28865a(0x8f2)]=_0xe9b879[_0x28865a(0x95d)](_0x2e58be[_0x28865a(0x60f)],_0x2e58be['framesMax']);const _0x377a98=this[_0x28865a(0x653)](this[_0x28865a(0x6b3)]);let _0x106170=_0x377a98[_0x28865a(0x6e0)]+this[_0x28865a(0x74e)]()*0x2;_0x106170+=$gameSystem['windowPadding']()*0x2;let _0x13a098=Math[_0x28865a(0x4ef)](_0x377a98[_0x28865a(0x592)],this[_0x28865a(0x3aa)]());_0x13a098+=$gameSystem[_0x28865a(0x3b6)]()*0x2;const _0x296c81=Math[_0x28865a(0x372)]((Graphics['width']-_0x106170)/0x2),_0x4b0efd=Math[_0x28865a(0x372)]((Graphics['height']-_0x13a098)/0x2),_0x32cfe8=new Rectangle(_0x296c81,_0x4b0efd,_0x106170,_0x13a098);this[_0x28865a(0x7ed)](_0x32cfe8['x'],_0x32cfe8['y'],_0x32cfe8[_0x28865a(0x6e0)],_0x32cfe8[_0x28865a(0x592)]),this[_0x28865a(0x63c)](),this['refresh'](),this[_0x28865a(0x8e2)](),SceneManager['_scene'][_0x28865a(0x46e)](this);},Window_TextPopup[_0x4a5d62(0x5da)][_0x4a5d62(0x278)]=function(){const _0x1a8033=_0x4a5d62,_0x3077c0=this[_0x1a8033(0x941)]();this[_0x1a8033(0x75e)]['clear'](),this[_0x1a8033(0x205)](this[_0x1a8033(0x6b3)],_0x3077c0['x'],_0x3077c0['y'],_0x3077c0[_0x1a8033(0x6e0)]);},Window_TextPopup[_0x4a5d62(0x5da)]['updateDuration']=function(){const _0x924233=_0x4a5d62;if(this[_0x924233(0x672)]()||this[_0x924233(0x80b)]())return;if(this[_0x924233(0x8f2)]<=0x0)return;this[_0x924233(0x8f2)]--,this['_timeDuration']<=0x0&&(this[_0x924233(0x80d)](),this[_0x924233(0x6b3)]='');},VisuMZ[_0x4a5d62(0x347)]=function(_0x4818da){const _0x333372=_0x4a5d62;if(Utils[_0x333372(0x2b5)](_0x333372(0x23a))){var _0x2d16d7=require('nw.gui')[_0x333372(0x464)]['get']();SceneManager['showDevTools']();if(_0x4818da)setTimeout(_0x2d16d7['focus']['bind'](_0x2d16d7),0x190);}},VisuMZ[_0x4a5d62(0x65a)]=function(_0x21a340,_0x739c27){const _0x127c51=_0x4a5d62;_0x739c27=_0x739c27[_0x127c51(0x8be)]();var _0x13a696=1.70158,_0x1a50a8=0.7;switch(_0x739c27){case _0x127c51(0x3f0):return _0x21a340;case'INSINE':return-0x1*Math['cos'](_0x21a340*(Math['PI']/0x2))+0x1;case _0x127c51(0x217):return Math[_0x127c51(0x231)](_0x21a340*(Math['PI']/0x2));case _0x127c51(0x607):return-0.5*(Math[_0x127c51(0x930)](Math['PI']*_0x21a340)-0x1);case _0x127c51(0x8b8):return _0x21a340*_0x21a340;case'OUTQUAD':return _0x21a340*(0x2-_0x21a340);case _0x127c51(0x96c):return _0x21a340<0.5?0x2*_0x21a340*_0x21a340:-0x1+(0x4-0x2*_0x21a340)*_0x21a340;case _0x127c51(0x3b9):return _0x21a340*_0x21a340*_0x21a340;case _0x127c51(0x541):var _0x2cf2ea=_0x21a340-0x1;return _0x2cf2ea*_0x2cf2ea*_0x2cf2ea+0x1;case'INOUTCUBIC':return _0x21a340<0.5?0x4*_0x21a340*_0x21a340*_0x21a340:(_0x21a340-0x1)*(0x2*_0x21a340-0x2)*(0x2*_0x21a340-0x2)+0x1;case'INQUART':return _0x21a340*_0x21a340*_0x21a340*_0x21a340;case'OUTQUART':var _0x2cf2ea=_0x21a340-0x1;return 0x1-_0x2cf2ea*_0x2cf2ea*_0x2cf2ea*_0x2cf2ea;case _0x127c51(0x998):var _0x2cf2ea=_0x21a340-0x1;return _0x21a340<0.5?0x8*_0x21a340*_0x21a340*_0x21a340*_0x21a340:0x1-0x8*_0x2cf2ea*_0x2cf2ea*_0x2cf2ea*_0x2cf2ea;case _0x127c51(0x7f1):return _0x21a340*_0x21a340*_0x21a340*_0x21a340*_0x21a340;case _0x127c51(0x53e):var _0x2cf2ea=_0x21a340-0x1;return 0x1+_0x2cf2ea*_0x2cf2ea*_0x2cf2ea*_0x2cf2ea*_0x2cf2ea;case _0x127c51(0x582):var _0x2cf2ea=_0x21a340-0x1;return _0x21a340<0.5?0x10*_0x21a340*_0x21a340*_0x21a340*_0x21a340*_0x21a340:0x1+0x10*_0x2cf2ea*_0x2cf2ea*_0x2cf2ea*_0x2cf2ea*_0x2cf2ea;case _0x127c51(0x781):if(_0x21a340===0x0)return 0x0;return Math[_0x127c51(0x28d)](0x2,0xa*(_0x21a340-0x1));case'OUTEXPO':if(_0x21a340===0x1)return 0x1;return-Math[_0x127c51(0x28d)](0x2,-0xa*_0x21a340)+0x1;case _0x127c51(0x432):if(_0x21a340===0x0||_0x21a340===0x1)return _0x21a340;var _0x34b06c=_0x21a340*0x2,_0x319cba=_0x34b06c-0x1;if(_0x34b06c<0x1)return 0.5*Math[_0x127c51(0x28d)](0x2,0xa*_0x319cba);return 0.5*(-Math[_0x127c51(0x28d)](0x2,-0xa*_0x319cba)+0x2);case _0x127c51(0x8c9):var _0x34b06c=_0x21a340/0x1;return-0x1*(Math[_0x127c51(0x622)](0x1-_0x34b06c*_0x21a340)-0x1);case _0x127c51(0x1f7):var _0x2cf2ea=_0x21a340-0x1;return Math['sqrt'](0x1-_0x2cf2ea*_0x2cf2ea);case _0x127c51(0x1d8):var _0x34b06c=_0x21a340*0x2,_0x319cba=_0x34b06c-0x2;if(_0x34b06c<0x1)return-0.5*(Math[_0x127c51(0x622)](0x1-_0x34b06c*_0x34b06c)-0x1);return 0.5*(Math['sqrt'](0x1-_0x319cba*_0x319cba)+0x1);case _0x127c51(0x8a5):return _0x21a340*_0x21a340*((_0x13a696+0x1)*_0x21a340-_0x13a696);case _0x127c51(0x511):var _0x34b06c=_0x21a340/0x1-0x1;return _0x34b06c*_0x34b06c*((_0x13a696+0x1)*_0x34b06c+_0x13a696)+0x1;break;case _0x127c51(0x39b):var _0x34b06c=_0x21a340*0x2,_0xc12676=_0x34b06c-0x2,_0x4ed9c8=_0x13a696*1.525;if(_0x34b06c<0x1)return 0.5*_0x34b06c*_0x34b06c*((_0x4ed9c8+0x1)*_0x34b06c-_0x4ed9c8);return 0.5*(_0xc12676*_0xc12676*((_0x4ed9c8+0x1)*_0xc12676+_0x4ed9c8)+0x2);case _0x127c51(0x569):if(_0x21a340===0x0||_0x21a340===0x1)return _0x21a340;var _0x34b06c=_0x21a340/0x1,_0x319cba=_0x34b06c-0x1,_0x500e2b=0x1-_0x1a50a8,_0x4ed9c8=_0x500e2b/(0x2*Math['PI'])*Math['asin'](0x1);return-(Math[_0x127c51(0x28d)](0x2,0xa*_0x319cba)*Math[_0x127c51(0x231)]((_0x319cba-_0x4ed9c8)*(0x2*Math['PI'])/_0x500e2b));case'OUTELASTIC':var _0x500e2b=0x1-_0x1a50a8,_0x34b06c=_0x21a340*0x2;if(_0x21a340===0x0||_0x21a340===0x1)return _0x21a340;var _0x4ed9c8=_0x500e2b/(0x2*Math['PI'])*Math['asin'](0x1);return Math[_0x127c51(0x28d)](0x2,-0xa*_0x34b06c)*Math[_0x127c51(0x231)]((_0x34b06c-_0x4ed9c8)*(0x2*Math['PI'])/_0x500e2b)+0x1;case'INOUTELASTIC':var _0x500e2b=0x1-_0x1a50a8;if(_0x21a340===0x0||_0x21a340===0x1)return _0x21a340;var _0x34b06c=_0x21a340*0x2,_0x319cba=_0x34b06c-0x1,_0x4ed9c8=_0x500e2b/(0x2*Math['PI'])*Math[_0x127c51(0x9a4)](0x1);if(_0x34b06c<0x1)return-0.5*(Math[_0x127c51(0x28d)](0x2,0xa*_0x319cba)*Math[_0x127c51(0x231)]((_0x319cba-_0x4ed9c8)*(0x2*Math['PI'])/_0x500e2b));return Math[_0x127c51(0x28d)](0x2,-0xa*_0x319cba)*Math[_0x127c51(0x231)]((_0x319cba-_0x4ed9c8)*(0x2*Math['PI'])/_0x500e2b)*0.5+0x1;case _0x127c51(0x94b):var _0x34b06c=_0x21a340/0x1;if(_0x34b06c<0x1/2.75)return 7.5625*_0x34b06c*_0x34b06c;else{if(_0x34b06c<0x2/2.75){var _0xc12676=_0x34b06c-1.5/2.75;return 7.5625*_0xc12676*_0xc12676+0.75;}else{if(_0x34b06c<2.5/2.75){var _0xc12676=_0x34b06c-2.25/2.75;return 7.5625*_0xc12676*_0xc12676+0.9375;}else{var _0xc12676=_0x34b06c-2.625/2.75;return 7.5625*_0xc12676*_0xc12676+0.984375;}}}case _0x127c51(0x3fb):var _0x26c44f=0x1-VisuMZ[_0x127c51(0x65a)](0x1-_0x21a340,'outbounce');return _0x26c44f;case _0x127c51(0x219):if(_0x21a340<0.5)var _0x26c44f=VisuMZ['ApplyEasing'](_0x21a340*0x2,_0x127c51(0x634))*0.5;else var _0x26c44f=VisuMZ[_0x127c51(0x65a)](_0x21a340*0x2-0x1,_0x127c51(0x600))*0.5+0.5;return _0x26c44f;default:return _0x21a340;}},VisuMZ[_0x4a5d62(0x871)]=function(_0x4aff25){const _0x59f762=_0x4a5d62;_0x4aff25=String(_0x4aff25)[_0x59f762(0x8be)]();const _0x46920e=VisuMZ[_0x59f762(0x2df)]['Settings'][_0x59f762(0x6ea)];if(_0x4aff25===_0x59f762(0x200))return _0x46920e[_0x59f762(0x718)];if(_0x4aff25===_0x59f762(0x48d))return _0x46920e['IconParam1'];if(_0x4aff25===_0x59f762(0x562))return _0x46920e[_0x59f762(0x53c)];if(_0x4aff25==='DEF')return _0x46920e['IconParam3'];if(_0x4aff25===_0x59f762(0x1e0))return _0x46920e[_0x59f762(0x823)];if(_0x4aff25===_0x59f762(0x953))return _0x46920e[_0x59f762(0x1c5)];if(_0x4aff25===_0x59f762(0x4f0))return _0x46920e['IconParam6'];if(_0x4aff25==='LUK')return _0x46920e[_0x59f762(0x47a)];if(_0x4aff25===_0x59f762(0x46b))return _0x46920e[_0x59f762(0x2a6)];if(_0x4aff25===_0x59f762(0x6b1))return _0x46920e[_0x59f762(0x69e)];if(_0x4aff25===_0x59f762(0x84d))return _0x46920e[_0x59f762(0x7dc)];if(_0x4aff25==='CEV')return _0x46920e['IconXParam3'];if(_0x4aff25===_0x59f762(0x816))return _0x46920e[_0x59f762(0x22e)];if(_0x4aff25===_0x59f762(0x5b2))return _0x46920e['IconXParam5'];if(_0x4aff25===_0x59f762(0x904))return _0x46920e[_0x59f762(0x308)];if(_0x4aff25==='HRG')return _0x46920e[_0x59f762(0x1ee)];if(_0x4aff25===_0x59f762(0x558))return _0x46920e['IconXParam8'];if(_0x4aff25===_0x59f762(0x849))return _0x46920e[_0x59f762(0x305)];if(_0x4aff25==='TGR')return _0x46920e['IconSParam0'];if(_0x4aff25===_0x59f762(0x2dd))return _0x46920e[_0x59f762(0x3bf)];if(_0x4aff25===_0x59f762(0x397))return _0x46920e[_0x59f762(0x23f)];if(_0x4aff25==='PHA')return _0x46920e[_0x59f762(0x4af)];if(_0x4aff25===_0x59f762(0x87f))return _0x46920e['IconSParam4'];if(_0x4aff25==='TCR')return _0x46920e['IconSParam5'];if(_0x4aff25==='PDR')return _0x46920e[_0x59f762(0x7de)];if(_0x4aff25===_0x59f762(0x7cb))return _0x46920e['IconSParam7'];if(_0x4aff25===_0x59f762(0x909))return _0x46920e[_0x59f762(0x273)];if(_0x4aff25===_0x59f762(0x222))return _0x46920e[_0x59f762(0x3c4)];if(VisuMZ[_0x59f762(0x2df)][_0x59f762(0x1d9)][_0x4aff25])return VisuMZ[_0x59f762(0x2df)][_0x59f762(0x1d9)][_0x4aff25]||0x0;return 0x0;},VisuMZ[_0x4a5d62(0x4a9)]=function(_0x35fdf7,_0x37c49e,_0x4d0a11){const _0xc28ab0=_0x4a5d62;if(_0x4d0a11===undefined&&_0x35fdf7%0x1===0x0)return _0x35fdf7;if(_0x4d0a11!==undefined&&['MAXHP','MAXMP',_0xc28ab0(0x562),_0xc28ab0(0x952),_0xc28ab0(0x1e0),_0xc28ab0(0x953),_0xc28ab0(0x4f0),_0xc28ab0(0x790)][_0xc28ab0(0x1cd)](String(_0x4d0a11)[_0xc28ab0(0x8be)]()[_0xc28ab0(0x5d4)]()))return _0x35fdf7;_0x37c49e=_0x37c49e||0x0;if(VisuMZ[_0xc28ab0(0x2df)][_0xc28ab0(0x26e)][_0x4d0a11])return VisuMZ[_0xc28ab0(0x2df)]['CustomParamType'][_0x4d0a11]===_0xc28ab0(0x60b)?_0x35fdf7:String((_0x35fdf7*0x64)[_0xc28ab0(0x246)](_0x37c49e))+'%';return String((_0x35fdf7*0x64)['toFixed'](_0x37c49e))+'%';},VisuMZ[_0x4a5d62(0x228)]=function(_0x1a7e99){const _0x57c1b1=_0x4a5d62;_0x1a7e99=String(_0x1a7e99);if(!_0x1a7e99)return _0x1a7e99;if(typeof _0x1a7e99!=='string')return _0x1a7e99;const _0x24cef9=VisuMZ['CoreEngine'][_0x57c1b1(0x7d0)][_0x57c1b1(0x235)][_0x57c1b1(0x647)]||_0x57c1b1(0x7cd),_0x15d141={'maximumFractionDigits':0x6};_0x1a7e99=_0x1a7e99[_0x57c1b1(0x805)](/\[(.*?)\]/g,(_0x39ab88,_0x2373fe)=>{const _0x3734cb=_0x57c1b1;return VisuMZ[_0x3734cb(0x6c3)](_0x2373fe,'[',']');}),_0x1a7e99=_0x1a7e99[_0x57c1b1(0x805)](/<(.*?)>/g,(_0x501d2b,_0x1e5d38)=>{const _0x5a04f0=_0x57c1b1;return VisuMZ[_0x5a04f0(0x6c3)](_0x1e5d38,'<','>');}),_0x1a7e99=_0x1a7e99['replace'](/\{\{(.*?)\}\}/g,(_0x6abed8,_0x1eeed9)=>{const _0x5808d1=_0x57c1b1;return VisuMZ[_0x5808d1(0x6c3)](_0x1eeed9,'','');}),_0x1a7e99=_0x1a7e99[_0x57c1b1(0x805)](/(\d+\.?\d*)/g,(_0xf74211,_0x283804)=>{const _0x5e4201=_0x57c1b1;let _0x29a7a5=_0x283804;if(_0x29a7a5[0x0]==='0')return _0x29a7a5;if(_0x29a7a5[_0x29a7a5[_0x5e4201(0x6d1)]-0x1]==='.')return Number(_0x29a7a5)[_0x5e4201(0x8d1)](_0x24cef9,_0x15d141)+'.';else return _0x29a7a5[_0x29a7a5[_0x5e4201(0x6d1)]-0x1]===','?Number(_0x29a7a5)['toLocaleString'](_0x24cef9,_0x15d141)+',':Number(_0x29a7a5)[_0x5e4201(0x8d1)](_0x24cef9,_0x15d141);});let _0x46537e=0x3;while(_0x46537e--){_0x1a7e99=VisuMZ[_0x57c1b1(0x7f5)](_0x1a7e99);}return _0x1a7e99;},VisuMZ[_0x4a5d62(0x6c3)]=function(_0x1023ef,_0x361ea3,_0x2e38a8){const _0x37f3d9=_0x4a5d62;return _0x1023ef=_0x1023ef[_0x37f3d9(0x805)](/(\d)/gi,(_0x4643d7,_0x1a6de2)=>'PRESERVCONVERSION(%1)'[_0x37f3d9(0x807)](Number(_0x1a6de2))),_0x37f3d9(0x20f)[_0x37f3d9(0x807)](_0x1023ef,_0x361ea3,_0x2e38a8);},VisuMZ[_0x4a5d62(0x7f5)]=function(_0x12e595){const _0xf9ddd4=_0x4a5d62;return _0x12e595=_0x12e595[_0xf9ddd4(0x805)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x3c90a6,_0x43375b)=>Number(parseInt(_0x43375b))),_0x12e595;},VisuMZ[_0x4a5d62(0x71b)]=function(_0x3cbbb9){const _0x360759=_0x4a5d62;SoundManager[_0x360759(0x97d)]();if(!Utils[_0x360759(0x220)]()){const _0x262f91=window[_0x360759(0x8e2)](_0x3cbbb9,_0x360759(0x9a0));}else{const _0xda3346=process[_0x360759(0x581)]==_0x360759(0x1f2)?_0x360759(0x8e2):process[_0x360759(0x581)]=='win32'?_0x360759(0x360):_0x360759(0x661);require(_0x360759(0x957))[_0x360759(0x34c)](_0xda3346+'\x20'+_0x3cbbb9);}},VisuMZ[_0x4a5d62(0x51d)]=function(_0x28cad9,_0x63a30f){const _0x509b5f=_0x4a5d62;if(!_0x28cad9)return'';const _0x517cc2=_0x28cad9['baseId']||_0x28cad9['id'];let _0x1a367d='';return _0x28cad9[_0x509b5f(0x4ae)]!==undefined&&_0x28cad9[_0x509b5f(0x7e3)]!==undefined&&(_0x1a367d=_0x509b5f(0x29f)['format'](_0x517cc2,_0x63a30f)),_0x28cad9[_0x509b5f(0x5ed)]!==undefined&&_0x28cad9['learnings']!==undefined&&(_0x1a367d=_0x509b5f(0x50e)[_0x509b5f(0x807)](_0x517cc2,_0x63a30f)),_0x28cad9['stypeId']!==undefined&&_0x28cad9['requiredWtypeId1']!==undefined&&(_0x1a367d='Skill-%1-%2'['format'](_0x517cc2,_0x63a30f)),_0x28cad9[_0x509b5f(0x5f1)]!==undefined&&_0x28cad9[_0x509b5f(0x677)]!==undefined&&(_0x1a367d=_0x509b5f(0x84b)['format'](_0x517cc2,_0x63a30f)),_0x28cad9[_0x509b5f(0x534)]!==undefined&&_0x28cad9['etypeId']===0x1&&(_0x1a367d=_0x509b5f(0x667)[_0x509b5f(0x807)](_0x517cc2,_0x63a30f)),_0x28cad9['atypeId']!==undefined&&_0x28cad9[_0x509b5f(0x548)]>0x1&&(_0x1a367d=_0x509b5f(0x733)['format'](_0x517cc2,_0x63a30f)),_0x28cad9[_0x509b5f(0x6ca)]!==undefined&&_0x28cad9[_0x509b5f(0x7c2)]!==undefined&&(_0x1a367d=_0x509b5f(0x1ab)[_0x509b5f(0x807)](_0x517cc2,_0x63a30f)),_0x28cad9[_0x509b5f(0x847)]!==undefined&&_0x28cad9[_0x509b5f(0x73f)]!==undefined&&(_0x1a367d=_0x509b5f(0x72d)[_0x509b5f(0x807)](_0x517cc2,_0x63a30f)),_0x1a367d;},Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x379)]=function(_0x5c1d35,_0x2f23fa){const _0x3629e2=_0x4a5d62,_0x3027e5=ImageManager[_0x3629e2(0x455)]||0x20,_0x365039=ImageManager[_0x3629e2(0x267)]||0x20;if(_0x2f23fa[_0x3629e2(0x46a)]){const _0x5441eb=_0x3027e5-ImageManager[_0x3629e2(0x285)],_0x1786bd=_0x365039-ImageManager['iconHeight'];let _0x24d523=0x2,_0x2849b3=0x2;this[_0x3629e2(0x3aa)]()!==0x24&&(_0x2849b3=Math[_0x3629e2(0x734)]((this[_0x3629e2(0x3aa)]()-_0x365039)/0x2));const _0x2c1404=_0x2f23fa['x']+Math[_0x3629e2(0x734)](_0x5441eb/0x2)+_0x24d523,_0x5713df=_0x2f23fa['y']+Math['floor'](_0x1786bd/0x2)+_0x2849b3;this[_0x3629e2(0x20e)](_0x5c1d35,_0x2c1404,_0x5713df);}_0x2f23fa['x']+=_0x3027e5+0x4;},Window_StatusBase['prototype'][_0x4a5d62(0x7bf)]=function(_0x1dcc1e,_0x16e0d1,_0x2712be,_0x593747){const _0x3ca7ec=_0x4a5d62;_0x593747=_0x593747||0x90;const _0x361497=ImageManager[_0x3ca7ec(0x455)]||0x20,_0x51a239=ImageManager[_0x3ca7ec(0x267)]||0x20,_0xa80ca8=_0x361497-ImageManager['iconWidth'],_0x22f0bf=_0x51a239-ImageManager['iconHeight'],_0x162910=_0x361497,_0x4f6aff=_0x1dcc1e['allIcons']()[_0x3ca7ec(0x237)](0x0,Math[_0x3ca7ec(0x734)](_0x593747/_0x162910));let _0x1209dc=_0x16e0d1+Math[_0x3ca7ec(0x783)](_0xa80ca8/0x2),_0x1090bc=_0x2712be+Math[_0x3ca7ec(0x783)](_0x22f0bf/0x2);for(const _0x270515 of _0x4f6aff){this[_0x3ca7ec(0x20e)](_0x270515,_0x1209dc,_0x1090bc),_0x1209dc+=_0x162910;}},Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x2f8)]=function(){return this['_anchor'];},VisuMZ['CoreEngine']['Game_Picture_initBasic']=Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x515)],Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x515)]=function(){const _0x280238=_0x4a5d62;VisuMZ[_0x280238(0x2df)][_0x280238(0x475)][_0x280238(0x35f)](this),this[_0x280238(0x7be)]={'x':0x0,'y':0x0},this[_0x280238(0x7a9)]={'x':0x0,'y':0x0};},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x6d7)]=Game_Picture['prototype'][_0x4a5d62(0x72f)],Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x72f)]=function(){const _0x4bde31=_0x4a5d62;this['updateAnchor']();const _0xc098e4=this['_duration'];VisuMZ[_0x4bde31(0x2df)][_0x4bde31(0x6d7)][_0x4bde31(0x35f)](this),_0xc098e4>0x0&&this[_0x4bde31(0x36b)]<=0x0&&(this['_x']=this[_0x4bde31(0x56d)],this['_y']=this[_0x4bde31(0x706)],this[_0x4bde31(0x493)]=this[_0x4bde31(0x76d)],this[_0x4bde31(0x5c7)]=this['_targetScaleY'],this['_opacity']=this[_0x4bde31(0x4fa)],this[_0x4bde31(0x7be)]&&(this[_0x4bde31(0x7be)]['x']=this[_0x4bde31(0x7a9)]['x'],this[_0x4bde31(0x7be)]['y']=this[_0x4bde31(0x7a9)]['y']));},VisuMZ['CoreEngine'][_0x4a5d62(0x3de)]=Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x8c4)],Game_Picture['prototype'][_0x4a5d62(0x8c4)]=function(_0x5607ad,_0x4c28c0,_0x4167b1,_0x1b90ef,_0x9ee221,_0xc34fcd,_0x5767d5,_0x1f4bd4){const _0x3ebea5=_0x4a5d62;VisuMZ[_0x3ebea5(0x2df)][_0x3ebea5(0x3de)]['call'](this,_0x5607ad,_0x4c28c0,_0x4167b1,_0x1b90ef,_0x9ee221,_0xc34fcd,_0x5767d5,_0x1f4bd4),this['setAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x4c28c0]||{'x':0x0,'y':0x0});},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x6d5)]=Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x7ed)],Game_Picture[_0x4a5d62(0x5da)]['move']=function(_0x481b9d,_0x3f1a07,_0x3befb5,_0x3c02b7,_0x54f70c,_0x205785,_0x23226c,_0x341d44,_0x2ecb0d){const _0x472c38=_0x4a5d62;VisuMZ[_0x472c38(0x2df)][_0x472c38(0x6d5)][_0x472c38(0x35f)](this,_0x481b9d,_0x3f1a07,_0x3befb5,_0x3c02b7,_0x54f70c,_0x205785,_0x23226c,_0x341d44,_0x2ecb0d),this[_0x472c38(0x7c1)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x481b9d]||{'x':0x0,'y':0x0});},Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x274)]=function(){const _0x2aab70=_0x4a5d62;this[_0x2aab70(0x36b)]>0x0&&(this[_0x2aab70(0x7be)]['x']=this[_0x2aab70(0x1bf)](this[_0x2aab70(0x7be)]['x'],this[_0x2aab70(0x7a9)]['x']),this[_0x2aab70(0x7be)]['y']=this[_0x2aab70(0x1bf)](this[_0x2aab70(0x7be)]['y'],this[_0x2aab70(0x7a9)]['y']));},Game_Picture[_0x4a5d62(0x5da)][_0x4a5d62(0x405)]=function(_0x51cfbb){const _0x53ed80=_0x4a5d62;this[_0x53ed80(0x7be)]=_0x51cfbb,this[_0x53ed80(0x7a9)]=JsonEx[_0x53ed80(0x430)](this['_anchor']);},Game_Picture[_0x4a5d62(0x5da)]['setTargetAnchor']=function(_0x82614f){this['_targetAnchor']=_0x82614f;},VisuMZ['CoreEngine'][_0x4a5d62(0x4e8)]=Sprite_Picture['prototype'][_0x4a5d62(0x542)],Sprite_Picture[_0x4a5d62(0x5da)]['updateOrigin']=function(){const _0x1f350d=_0x4a5d62,_0x17cfc0=this[_0x1f350d(0x3fe)]();!_0x17cfc0[_0x1f350d(0x2f8)]()?VisuMZ[_0x1f350d(0x2df)][_0x1f350d(0x4e8)][_0x1f350d(0x35f)](this):(this['anchor']['x']=_0x17cfc0[_0x1f350d(0x2f8)]()['x'],this['anchor']['y']=_0x17cfc0['anchor']()['y']);},Game_Action[_0x4a5d62(0x5da)]['setEnemyAction']=function(_0x4fdf0b){const _0x15fe55=_0x4a5d62;if(_0x4fdf0b){const _0x11eae0=_0x4fdf0b[_0x15fe55(0x6b8)];if(_0x11eae0===0x1&&this[_0x15fe55(0x303)]()[_0x15fe55(0x735)]()!==0x1)this['setAttack']();else _0x11eae0===0x2&&this['subject']()[_0x15fe55(0x46f)]()!==0x2?this[_0x15fe55(0x206)]():this[_0x15fe55(0x19c)](_0x11eae0);}else this['clear']();},Game_Actor['prototype'][_0x4a5d62(0x835)]=function(){const _0x1d736c=_0x4a5d62;return this[_0x1d736c(0x8ff)]()['filter'](_0x4ad684=>this[_0x1d736c(0x472)](_0x4ad684)&&this[_0x1d736c(0x426)]()[_0x1d736c(0x1cd)](_0x4ad684[_0x1d736c(0x3d4)]));},Window_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x6ec)]=function(){const _0x3965c3=_0x4a5d62;this[_0x3965c3(0x383)]=new Sprite(),this[_0x3965c3(0x383)][_0x3965c3(0x757)]=new Bitmap(0x0,0x0),this[_0x3965c3(0x383)]['x']=0x0,this['addChildToBack'](this[_0x3965c3(0x383)]);},Window_Base['prototype']['refreshDimmerBitmap']=function(){const _0x3c0fac=_0x4a5d62;if(this[_0x3c0fac(0x383)]){const _0x58056c=this['_dimmerSprite']['bitmap'],_0x23286a=this[_0x3c0fac(0x6e0)],_0x184db0=this[_0x3c0fac(0x592)],_0x150046=this[_0x3c0fac(0x8ce)],_0x5407cd=ColorManager[_0x3c0fac(0x4fb)](),_0x2fcf30=ColorManager[_0x3c0fac(0x4dd)]();_0x58056c[_0x3c0fac(0x398)](_0x23286a,_0x184db0),_0x58056c['gradientFillRect'](0x0,0x0,_0x23286a,_0x150046,_0x2fcf30,_0x5407cd,!![]),_0x58056c[_0x3c0fac(0x47d)](0x0,_0x150046,_0x23286a,_0x184db0-_0x150046*0x2,_0x5407cd),_0x58056c['gradientFillRect'](0x0,_0x184db0-_0x150046,_0x23286a,_0x150046,_0x5407cd,_0x2fcf30,!![]),this['_dimmerSprite'][_0x3c0fac(0x19b)](0x0,0x0,_0x23286a,_0x184db0);}},Game_Actor['prototype']['makeAutoBattleActions']=function(){const _0x3ceaf3=_0x4a5d62;for(let _0x587da8=0x0;_0x587da8<this[_0x3ceaf3(0x3d8)]();_0x587da8++){const _0x4d028d=this[_0x3ceaf3(0x4a8)]();let _0xddfc7e=Number[_0x3ceaf3(0x8e7)];this[_0x3ceaf3(0x240)](_0x587da8,_0x4d028d[0x0]);for(const _0x1a941b of _0x4d028d){const _0x1ea755=_0x1a941b[_0x3ceaf3(0x8f9)]();_0x1ea755>_0xddfc7e&&(_0xddfc7e=_0x1ea755,this[_0x3ceaf3(0x240)](_0x587da8,_0x1a941b));}}this['setActionState']('waiting');},Window_BattleItem['prototype'][_0x4a5d62(0x7f7)]=function(_0x303663){const _0x1805bb=_0x4a5d62;return BattleManager['actor']()?BattleManager[_0x1805bb(0x3ea)]()['canUse'](_0x303663):Window_ItemList[_0x1805bb(0x5da)]['isEnabled'][_0x1805bb(0x35f)](this,_0x303663);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x94d)]=Scene_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x63d)],Scene_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x63d)]=function(){const _0x325a1=_0x4a5d62;VisuMZ[_0x325a1(0x2df)]['Scene_Map_createSpritesetFix'][_0x325a1(0x35f)](this);const _0x364137=this[_0x325a1(0x5f4)]['_timerSprite'];if(_0x364137)this[_0x325a1(0x46e)](_0x364137);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x54a)]=Scene_Battle[_0x4a5d62(0x5da)][_0x4a5d62(0x63d)],Scene_Battle['prototype'][_0x4a5d62(0x63d)]=function(){const _0x5824ad=_0x4a5d62;VisuMZ['CoreEngine'][_0x5824ad(0x54a)][_0x5824ad(0x35f)](this);const _0x4981c6=this[_0x5824ad(0x5f4)][_0x5824ad(0x299)];if(_0x4981c6)this[_0x5824ad(0x46e)](_0x4981c6);},Sprite_Actor[_0x4a5d62(0x5da)][_0x4a5d62(0x8fa)]=function(){const _0x59aaaa=_0x4a5d62;Sprite_Battler[_0x59aaaa(0x5da)]['update'][_0x59aaaa(0x35f)](this),this[_0x59aaaa(0x68f)]();if(this[_0x59aaaa(0x698)])this[_0x59aaaa(0x4ab)]();else this[_0x59aaaa(0x4cc)]!==''&&(this[_0x59aaaa(0x4cc)]='');},Window[_0x4a5d62(0x5da)]['_refreshArrows']=function(){const _0x45bf2f=_0x4a5d62,_0x3aa960=this[_0x45bf2f(0x42c)],_0x3fa433=this[_0x45bf2f(0x6a0)],_0x3d4533=0x18,_0x4acb3e=_0x3d4533/0x2,_0x48364b=0x60+_0x3d4533,_0x177858=0x0+_0x3d4533;this['_downArrowSprite'][_0x45bf2f(0x757)]=this[_0x45bf2f(0x91b)],this[_0x45bf2f(0x630)][_0x45bf2f(0x2f8)]['x']=0.5,this[_0x45bf2f(0x630)][_0x45bf2f(0x2f8)]['y']=0.5,this[_0x45bf2f(0x630)]['setFrame'](_0x48364b+_0x4acb3e,_0x177858+_0x4acb3e+_0x3d4533,_0x3d4533,_0x4acb3e),this[_0x45bf2f(0x630)][_0x45bf2f(0x7ed)](Math['round'](_0x3aa960/0x2),Math[_0x45bf2f(0x372)](_0x3fa433-_0x4acb3e)),this['_upArrowSprite'][_0x45bf2f(0x757)]=this['_windowskin'],this[_0x45bf2f(0x284)][_0x45bf2f(0x2f8)]['x']=0.5,this[_0x45bf2f(0x284)][_0x45bf2f(0x2f8)]['y']=0.5,this[_0x45bf2f(0x284)]['setFrame'](_0x48364b+_0x4acb3e,_0x177858,_0x3d4533,_0x4acb3e),this[_0x45bf2f(0x284)][_0x45bf2f(0x7ed)](Math[_0x45bf2f(0x372)](_0x3aa960/0x2),Math['round'](_0x4acb3e));},Window[_0x4a5d62(0x5da)][_0x4a5d62(0x89d)]=function(){const _0x4cea6f=_0x4a5d62,_0x422e32=0x90,_0x20b448=0x60,_0x280623=0x18;this[_0x4cea6f(0x441)][_0x4cea6f(0x757)]=this[_0x4cea6f(0x91b)],this[_0x4cea6f(0x441)][_0x4cea6f(0x2f8)]['x']=0.5,this[_0x4cea6f(0x441)][_0x4cea6f(0x2f8)]['y']=0x1,this[_0x4cea6f(0x441)][_0x4cea6f(0x7ed)](Math[_0x4cea6f(0x372)](this['_width']/0x2),this[_0x4cea6f(0x6a0)]),this[_0x4cea6f(0x441)]['setFrame'](_0x422e32,_0x20b448,_0x280623,_0x280623),this[_0x4cea6f(0x441)][_0x4cea6f(0x21d)]=0xff;},Window[_0x4a5d62(0x5da)][_0x4a5d62(0x877)]=function(){const _0x371b0e=_0x4a5d62,_0xf80d13=this[_0x371b0e(0x94a)]['worldTransform']['apply'](new Point(0x0,0x0)),_0x266c6d=this[_0x371b0e(0x94a)]['filterArea'];_0x266c6d['x']=_0xf80d13['x']+this[_0x371b0e(0x8ca)]['x'],_0x266c6d['y']=_0xf80d13['y']+this[_0x371b0e(0x8ca)]['y'],_0x266c6d[_0x371b0e(0x6e0)]=Math[_0x371b0e(0x783)](this[_0x371b0e(0x610)]*this[_0x371b0e(0x442)]['x']),_0x266c6d[_0x371b0e(0x592)]=Math['ceil'](this[_0x371b0e(0x915)]*this[_0x371b0e(0x442)]['y']);},VisuMZ[_0x4a5d62(0x2df)]['Window_refreshBack']=Window[_0x4a5d62(0x5da)][_0x4a5d62(0x1a4)],Window[_0x4a5d62(0x5da)][_0x4a5d62(0x1a4)]=function(){const _0x33d751=_0x4a5d62,_0x5a9022=VisuMZ[_0x33d751(0x2df)]['Settings'][_0x33d751(0x464)][_0x33d751(0x4a7)]??!![];if(!_0x5a9022)return VisuMZ[_0x33d751(0x2df)]['Window_refreshBack'][_0x33d751(0x35f)](this);const _0x10f3e5=this['_margin'],_0x4d6110=Math[_0x33d751(0x4ef)](0x0,this['_width']-_0x10f3e5*0x2),_0x35dfda=Math[_0x33d751(0x4ef)](0x0,this['_height']-_0x10f3e5*0x2),_0x51f6cc=this[_0x33d751(0x418)],_0x4aae34=_0x51f6cc[_0x33d751(0x380)][0x0];_0x51f6cc[_0x33d751(0x757)]=this[_0x33d751(0x91b)],_0x51f6cc[_0x33d751(0x19b)](0x0,0x0,0x60,0x60),_0x51f6cc[_0x33d751(0x7ed)](_0x10f3e5,_0x10f3e5),_0x51f6cc[_0x33d751(0x442)]['x']=_0x4d6110/0x60,_0x51f6cc[_0x33d751(0x442)]['y']=_0x35dfda/0x60,_0x4aae34[_0x33d751(0x757)]=this['_windowskin'],_0x4aae34[_0x33d751(0x19b)](0x0,0x60,0x60,0x60),_0x4aae34[_0x33d751(0x7ed)](0x0,0x0,_0x4d6110,_0x35dfda),_0x4aae34[_0x33d751(0x442)]['x']=0x1/_0x51f6cc[_0x33d751(0x442)]['x'],_0x4aae34['scale']['y']=0x1/_0x51f6cc['scale']['y'],_0x51f6cc[_0x33d751(0x6fa)](this[_0x33d751(0x5cc)]);},Game_Temp[_0x4a5d62(0x5da)][_0x4a5d62(0x879)]=function(){const _0x196738=_0x4a5d62;this[_0x196738(0x31d)]=[],this[_0x196738(0x39e)]=[],this[_0x196738(0x49c)]=[],this[_0x196738(0x47b)]=[];},VisuMZ['CoreEngine'][_0x4a5d62(0x3be)]=Scene_Base['prototype']['terminate'],Scene_Base[_0x4a5d62(0x5da)][_0x4a5d62(0x830)]=function(){const _0x32336b=_0x4a5d62;if($gameTemp)$gameTemp['sceneTerminationClearEffects']();VisuMZ[_0x32336b(0x2df)]['Scene_Base_terminateAnimationClearBugFix'][_0x32336b(0x35f)](this);},Bitmap[_0x4a5d62(0x5da)][_0x4a5d62(0x967)]=function(_0x52f3b6){const _0x30f8d3=_0x4a5d62,_0xa32d66=this[_0x30f8d3(0x1d4)];_0xa32d66['save'](),_0xa32d66[_0x30f8d3(0x88d)]=this[_0x30f8d3(0x8b5)]();const _0x2b0634=_0xa32d66['measureText'](_0x52f3b6)[_0x30f8d3(0x6e0)];return _0xa32d66[_0x30f8d3(0x691)](),_0x2b0634;},Window_Message['prototype'][_0x4a5d62(0x67a)]=function(_0x251086){const _0x502631=_0x4a5d62;return this[_0x502631(0x8d4)]()?this[_0x502631(0x75e)]['measureTextWidthNoRounding'](_0x251086):Window_Base['prototype'][_0x502631(0x67a)]['call'](this,_0x251086);},Window_Message[_0x4a5d62(0x5da)]['useFontWidthFix']=function(){const _0x3f72d5=_0x4a5d62;return VisuMZ[_0x3f72d5(0x2df)][_0x3f72d5(0x7d0)][_0x3f72d5(0x235)][_0x3f72d5(0x84a)]??!![];},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x844)]=Game_Action[_0x4a5d62(0x5da)][_0x4a5d62(0x501)],Game_Action['prototype']['numRepeats']=function(){const _0x3517f0=_0x4a5d62;return this[_0x3517f0(0x6be)]()?VisuMZ[_0x3517f0(0x2df)][_0x3517f0(0x844)][_0x3517f0(0x35f)](this):0x0;},VisuMZ['CoreEngine'][_0x4a5d62(0x362)]=Game_Action['prototype'][_0x4a5d62(0x61c)],Game_Action[_0x4a5d62(0x5da)][_0x4a5d62(0x61c)]=function(){const _0x20bcad=_0x4a5d62;if(this[_0x20bcad(0x303)]()&&this[_0x20bcad(0x303)]()[_0x20bcad(0x445)]())VisuMZ[_0x20bcad(0x2df)]['Game_Action_setAttack'][_0x20bcad(0x35f)](this);else BattleManager[_0x20bcad(0x67d)]?VisuMZ[_0x20bcad(0x2df)][_0x20bcad(0x362)]['call'](this):this['clear']();},VisuMZ[_0x4a5d62(0x2df)]['BattleManager_invokeCounterAttack']=BattleManager[_0x4a5d62(0x97f)],BattleManager[_0x4a5d62(0x97f)]=function(_0x3ddc22,_0x124c1b){const _0x121dee=_0x4a5d62;this[_0x121dee(0x67d)]=!![],VisuMZ[_0x121dee(0x2df)][_0x121dee(0x7ff)]['call'](this,_0x3ddc22,_0x124c1b),this[_0x121dee(0x67d)]=undefined;},Sprite_Name[_0x4a5d62(0x5da)]['bitmapHeight']=function(){return 0x24;},Sprite_Name[_0x4a5d62(0x5da)][_0x4a5d62(0x491)]=function(){const _0x2126bd=_0x4a5d62,_0x30dfbd=this['name'](),_0x3e83d3=this['bitmapWidth'](),_0x11dd2c=this['bitmapHeight']();this[_0x2126bd(0x37e)](),this[_0x2126bd(0x757)][_0x2126bd(0x650)](),this[_0x2126bd(0x757)][_0x2126bd(0x997)](_0x30dfbd,0x4,0x0,_0x3e83d3-0xa,_0x11dd2c,_0x2126bd(0x474));},Bitmap[_0x4a5d62(0x5da)][_0x4a5d62(0x997)]=function(_0x36dfd0,_0x351e21,_0x135d01,_0x356ca9,_0x47d02c,_0x2a1613){const _0x351bee=_0x4a5d62,_0x3a682b=this[_0x351bee(0x1d4)],_0x3b0375=_0x3a682b[_0x351bee(0x1aa)];_0x356ca9=_0x356ca9||0xffffffff;let _0x4146a9=_0x351e21,_0x3c9986=Math[_0x351bee(0x372)](_0x135d01+0x18/0x2+this[_0x351bee(0x471)]*0.35);_0x2a1613==='center'&&(_0x4146a9+=_0x356ca9/0x2),_0x2a1613===_0x351bee(0x743)&&(_0x4146a9+=_0x356ca9),_0x3a682b[_0x351bee(0x495)](),_0x3a682b[_0x351bee(0x88d)]=this[_0x351bee(0x8b5)](),_0x3a682b['textAlign']=_0x2a1613,_0x3a682b[_0x351bee(0x373)]='alphabetic',_0x3a682b[_0x351bee(0x1aa)]=0x1,this['_drawTextOutline'](_0x36dfd0,_0x4146a9,_0x3c9986,_0x356ca9),_0x3a682b['globalAlpha']=_0x3b0375,this[_0x351bee(0x1df)](_0x36dfd0,_0x4146a9,_0x3c9986,_0x356ca9),_0x3a682b[_0x351bee(0x691)](),this[_0x351bee(0x224)][_0x351bee(0x8fa)]();},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x867)]=BattleManager[_0x4a5d62(0x7fe)],BattleManager[_0x4a5d62(0x7fe)]=function(_0x28f1d6){const _0x24049f=_0x4a5d62;if(this[_0x24049f(0x591)]&&this[_0x24049f(0x591)][_0x24049f(0x958)]()===_0x28f1d6[_0x24049f(0x958)]())return![];return VisuMZ[_0x24049f(0x2df)][_0x24049f(0x867)][_0x24049f(0x35f)](this,_0x28f1d6);},BattleManager[_0x4a5d62(0x291)]=function(){const _0x1ae8da=_0x4a5d62;if(this['_subject'])this[_0x1ae8da(0x5bb)][_0x1ae8da(0x291)](this[_0x1ae8da(0x591)]);this[_0x1ae8da(0x1fb)]='turn',this[_0x1ae8da(0x591)]&&this[_0x1ae8da(0x591)][_0x1ae8da(0x3d8)]()===0x0&&(this[_0x1ae8da(0x8cf)](this[_0x1ae8da(0x591)]),this[_0x1ae8da(0x591)]=null);},Bitmap['prototype'][_0x4a5d62(0x24b)]=function(){const _0x54e7b7=_0x4a5d62;this[_0x54e7b7(0x828)]=new Image(),this[_0x54e7b7(0x828)]['onload']=this[_0x54e7b7(0x2f2)][_0x54e7b7(0x37c)](this),this[_0x54e7b7(0x828)][_0x54e7b7(0x1e9)]=this['_onError']['bind'](this),this[_0x54e7b7(0x77b)](),this[_0x54e7b7(0x294)]=_0x54e7b7(0x76f),Utils[_0x54e7b7(0x4f7)]()?this[_0x54e7b7(0x572)]():(this[_0x54e7b7(0x828)][_0x54e7b7(0x295)]=this[_0x54e7b7(0x928)],![]&&this[_0x54e7b7(0x828)][_0x54e7b7(0x6e0)]>0x0&&(this[_0x54e7b7(0x828)][_0x54e7b7(0x7ee)]=null,this[_0x54e7b7(0x2f2)]()));},Scene_Skill[_0x4a5d62(0x5da)][_0x4a5d62(0x207)]=function(){const _0x2377fe=_0x4a5d62;Scene_MenuBase[_0x2377fe(0x5da)][_0x2377fe(0x207)][_0x2377fe(0x35f)](this),this[_0x2377fe(0x313)](),this['_itemWindow']['deactivate'](),this['_itemWindow']['deselect'](),this[_0x2377fe(0x4c8)]['activate']();},Scene_Skill[_0x4a5d62(0x5da)][_0x4a5d62(0x73a)]=function(){const _0x37fd8c=_0x4a5d62;return this[_0x37fd8c(0x4c8)]&&this['_skillTypeWindow'][_0x37fd8c(0x7b8)];},Game_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x889)]=function(_0x33d52d,_0xfcf7bb,_0x152b64){const _0x528b6a=_0x4a5d62,_0x1cb432=this[_0x528b6a(0x1ba)](),_0x2e3ef2=this[_0x528b6a(0x66b)](_0x33d52d,_0xfcf7bb);for(const _0x5c7db0 of _0x2e3ef2){const _0x49a448=_0x1cb432[_0x5c7db0];if(_0x49a448===undefined||_0x49a448===null){if($gameTemp[_0x528b6a(0x84c)]()&&!DataManager[_0x528b6a(0x4e1)]()){let _0x512ed8=_0x528b6a(0x77a)+'\x0a';_0x512ed8+=_0x528b6a(0x33e)+'\x0a',_0x512ed8+=_0x528b6a(0x3f2);if(this[_0x528b6a(0x555)]())alert(_0x512ed8),SceneManager[_0x528b6a(0x6d4)]();else{if(!this[_0x528b6a(0x5eb)])console['log'](_0x512ed8);this['_displayedPassageError']=!![];}}}if((_0x49a448&0x10)!==0x0)continue;if((_0x49a448&_0x152b64)===0x0)return!![];if((_0x49a448&_0x152b64)===_0x152b64)return![];}return![];},Game_Map['prototype'][_0x4a5d62(0x555)]=function(){const _0x594b57=_0x4a5d62;if(Imported[_0x594b57(0x53d)])return!![];if(Imported[_0x594b57(0x921)])return!![];return![];},Sprite_Animation[_0x4a5d62(0x5da)][_0x4a5d62(0x5ce)]=function(_0x1d08fb){const _0x166e74=_0x4a5d62;!this[_0x166e74(0x2fc)]&&(this[_0x166e74(0x2fc)]=_0x1d08fb['gl'][_0x166e74(0x2f1)](_0x1d08fb['gl']['VIEWPORT']));},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x35e)]=Scene_Map[_0x4a5d62(0x5da)][_0x4a5d62(0x88b)],Scene_Map['prototype'][_0x4a5d62(0x88b)]=function(){const _0x1883bd=_0x4a5d62,_0x3debb0=SceneManager[_0x1883bd(0x409)][_0x1883bd(0x79f)];if(['Scene_Title',_0x1883bd(0x5ff),_0x1883bd(0x510),_0x1883bd(0x422)]['includes'](_0x3debb0))return![];return VisuMZ[_0x1883bd(0x2df)][_0x1883bd(0x35e)]['call'](this);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x83c)]=Window_SkillList['prototype'][_0x4a5d62(0x1cd)],Window_SkillList['prototype'][_0x4a5d62(0x1cd)]=function(_0x1c92ba){const _0x1f06b4=_0x4a5d62;if(this['_stypeId']<=0x0)return![];return VisuMZ[_0x1f06b4(0x2df)][_0x1f06b4(0x83c)][_0x1f06b4(0x35f)](this,_0x1c92ba);},VisuMZ[_0x4a5d62(0x2df)][_0x4a5d62(0x6cd)]=Game_Battler[_0x4a5d62(0x5da)][_0x4a5d62(0x86c)],Game_Battler['prototype']['initTpbChargeTime']=function(_0x4eacd2){const _0x1da812=_0x4a5d62;VisuMZ[_0x1da812(0x2df)]['Game_Battler_initTpbChargeTime'][_0x1da812(0x35f)](this,_0x4eacd2),isNaN(this['_tpbChargeTime'])&&(VisuMZ[_0x1da812(0x2df)]['Game_Battler_initTpbChargeTime'][_0x1da812(0x35f)](this,_0x4eacd2),isNaN(this['_tpbChargeTime'])&&(this[_0x1da812(0x41f)]=0x0));},Game_Battler[_0x4a5d62(0x5da)][_0x4a5d62(0x7c4)]=function(){const _0x35726=_0x4a5d62;this[_0x35726(0x668)]===_0x35726(0x6d8)&&(this['_tpbChargeTime']+=this[_0x35726(0x1bb)](),isNaN(this['_tpbChargeTime'])&&(this[_0x35726(0x41f)]=this[_0x35726(0x1bb)](),isNaN(this['_tpbChargeTime'])&&(this[_0x35726(0x41f)]=0x0)),this[_0x35726(0x41f)]>=0x1&&(this['_tpbChargeTime']=0x1,this[_0x35726(0x257)]()));};