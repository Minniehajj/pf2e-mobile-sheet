/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { ItemSheetDataPF2e, ItemSheetOptions, ItemSheetPF2e } from "@item/base/sheet/sheet.ts";
import { TraitTagifyEntry } from "@module/sheet/helpers.ts";
import { DamageCategoryUnique, DamageType } from "@system/damage/types.ts";
import type { SpellPF2e, SpellSystemData, SpellSystemSource } from "./index.ts";
export declare class SpellSheetPF2e extends ItemSheetPF2e<SpellPF2e> {
    #private;
    static get defaultOptions(): ItemSheetOptions;
    get id(): string;
    protected get validTraits(): Record<string, string> | null;
    getData(options?: Partial<ItemSheetOptions>): Promise<SpellSheetData>;
    get title(): string;
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
    protected _onDragStart(event: DragEvent): void;
    protected _onDrop(event: DragEvent): Promise<void>;
    private getAvailableHeightenLevels;
}
interface SpellSheetData extends ItemSheetDataPF2e<SpellPF2e> {
    passiveDefense: string | null;
    isVariant: boolean;
    variants: {
        name: string;
        variantId: string | null;
        sort: number;
        actions: string;
    }[];
    materials: typeof CONFIG.PF2E.materialDamageEffects;
    damageTypes: Record<DamageType, string>;
    damageSubtypes: Pick<typeof CONFIG.PF2E.damageCategories, DamageCategoryUnique>;
    damageKinds: Record<string, {
        value: string[];
        label: string;
        selected: boolean;
        disabled: boolean;
    }[]>;
    areaSizes: typeof CONFIG.PF2E.areaSizes;
    areaTypes: typeof CONFIG.PF2E.areaTypes;
    heightenIntervals: number[];
    heightenOverlays: SpellSheetHeightenOverlayData[];
    canHeighten: boolean;
}
interface SpellSheetOverlayData {
    id: string | null;
    /** Base path to the property, dot delimited */
    base: string;
    /** Base path to the spell override data, dot delimited. Currently this is the same as base */
    dataPath: string;
    level: number | null;
    type: "heighten" | "variant";
    system: Partial<SpellSystemSource> | null;
}
interface SpellSheetHeightenOverlayData extends SpellSheetOverlayData {
    system: Partial<SpellSystemSource>;
    heightenLevels: number[];
    missing: {
        key: keyof SpellSystemData;
        label: string;
    }[];
    traits?: TraitTagifyEntry[] | null;
}
export {};
