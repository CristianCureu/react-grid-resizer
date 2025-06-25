export type ConfigItem = {
    id: string;
    label: string;
    width: string;
};

export type ColumnConfig<K extends string = string> = Record<K, ConfigItem[]>;

export type ConfigKey<T extends ColumnConfig<string>> = keyof T;

export type ConfigItemFromConfig<T extends ColumnConfig<string>> = T[keyof T][number];