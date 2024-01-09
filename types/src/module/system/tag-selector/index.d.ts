declare const TAG_SELECTOR_TYPES: readonly ["basic", "languages", "senses", "speed-types"];
type TagSelectorType = (typeof TAG_SELECTOR_TYPES)[number];
declare const SELECTABLE_TAG_FIELDS: readonly [
	"abilities",
	"actionTraits",
	"attackEffects",
	"creatureTraits",
	"damageCategories",
	"levels",
	"materialDamageEffects",
	"otherArmorTags",
	"otherConsumableTags",
	"otherWeaponTags",
	"senses",
	"skills",
	"speedTypes",
	"vehicleTraits",
	"weaponTraits",
];
type SelectableTagField = (typeof SELECTABLE_TAG_FIELDS)[number] | "languages";
export type { TagSelectorOptions } from "./base.ts";
export { TagSelectorBasic } from "./basic.ts";
export type { BasicConstructorOptions, BasicSelectorOptions } from "./basic.ts";
export { LanguageSelector } from "./languages.ts";
export { SenseSelector } from "./senses.ts";
export { SpeedSelector } from "./speeds.ts";
export { SELECTABLE_TAG_FIELDS, TAG_SELECTOR_TYPES };
export type { SelectableTagField, TagSelectorType };
