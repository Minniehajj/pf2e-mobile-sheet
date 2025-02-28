import type { Language } from "@actor/creature/index.ts";
import type { BaseWeaponType } from "@item/weapon/types.ts";
import type { SetField, StringField } from "types/foundry/common/data/fields.d.ts";
import type { MenuTemplateData, SettingsTemplateData } from "../menu.ts";
declare const HOMEBREW_TRAIT_KEYS: readonly ["creatureTraits", "featTraits", "languages", "spellTraits", "weaponCategories", "weaponGroups", "baseWeapons", "weaponTraits", "equipmentTraits"];
/** Homebrew elements from some of the above records are propagated to related records */
declare const TRAIT_PROPAGATIONS: {
    readonly creatureTraits: readonly ["ancestryTraits"];
    readonly equipmentTraits: readonly ["armorTraits", "consumableTraits"];
    readonly featTraits: readonly ["actionTraits"];
    readonly weaponTraits: readonly ["npcAttackTraits"];
};
type HomebrewTraitKey = (typeof HOMEBREW_TRAIT_KEYS)[number];
type HomebrewKey = HomebrewTraitKey | "damageTypes" | "languageRarities";
type HomebrewTraitSettingsKey = `homebrew.${HomebrewTraitKey}`;
interface HomebrewTag<T extends HomebrewTraitKey = HomebrewTraitKey> {
    id: T extends "baseWeapons" ? BaseWeaponType : T extends "languages" ? LanguageNotCommon : T extends Exclude<HomebrewTraitKey, "baseWeapons" | "languages"> ? keyof (typeof CONFIG.PF2E)[T] : never;
    value: string;
}
type MainDamageCategories = "physical" | "energy";
interface CustomDamageData {
    label: string;
    category?: MainDamageCategories | null;
    icon: string | null;
}
interface HomebrewElementsSheetData extends MenuTemplateData {
    campaignSettings: Record<string, SettingsTemplateData>;
    traitSettings: Record<string, SettingsTemplateData>;
    languageRarities: LanguageRaritiesSheetData;
    damageCategories: Record<MainDamageCategories, string>;
    customDamageTypes: CustomDamageData[];
}
interface LanguageRaritiesSheetData {
    commonLanguage: LanguageNotCommon | null;
    common: {
        slug: LanguageNotCommon;
        label: string;
    }[];
    uncommon: {
        slug: LanguageNotCommon;
        label: string;
    }[];
    rare: {
        slug: LanguageNotCommon;
        label: string;
    }[];
    secret: {
        slug: LanguageNotCommon;
        label: string;
    }[];
}
type LanguageNotCommon = Exclude<Language, "common">;
declare class LanguageRaritiesData extends foundry.abstract.DataModel<null, LanguageRaritiesSchema> {
    /** Common-rarity languages: those not classified among the subsequent rarities */
    common: Set<LanguageNotCommon>;
    protected _initialize(options?: Record<string, unknown>): void;
    static defineSchema(): LanguageRaritiesSchema;
    /** Include common languages in the non-source raw object. */
    toObject(source?: true): this["_source"];
    toObject(source: false): RawLanguageRarities<this>;
    toObject(source?: boolean): this["_source"] | RawLanguageRarities<this>;
    /** Schema-restricting choices removes homebrew languages before they're registered: prune in ready hook instead. */
    onReady(): void;
}
interface LanguageRaritiesData extends foundry.abstract.DataModel<null, LanguageRaritiesSchema>, ModelPropsFromSchema<LanguageRaritiesSchema> {
}
type LanguageRaritiesSchema = {
    /** The "common" tongue of the region, rather than languages of common rarity */
    commonLanguage: StringField<LanguageNotCommon, LanguageNotCommon, true, true, true>;
    /** Languages of uncommon rarity */
    uncommon: LanguageSetField;
    /** Languages of rare rarity */
    rare: LanguageSetField;
    /** "Secret" languages (Wildsong) */
    secret: LanguageSetField;
    /** Languages hidden from player view in the language selector */
    hidden: LanguageSetField;
};
type LanguageSetField = SetField<StringField<LanguageNotCommon, LanguageNotCommon, true, false, false>, LanguageNotCommon[], Set<LanguageNotCommon>, true, false, true>;
type RawLanguageRarities<TModel extends LanguageRaritiesData = LanguageRaritiesData> = RawObject<TModel> & {
    common: LanguageNotCommon[];
};
export { HOMEBREW_TRAIT_KEYS, LanguageRaritiesData, TRAIT_PROPAGATIONS };
export type { CustomDamageData, HomebrewElementsSheetData, HomebrewKey, HomebrewTag, HomebrewTraitKey, HomebrewTraitSettingsKey, LanguageNotCommon, LanguageRaritiesSheetData, };
