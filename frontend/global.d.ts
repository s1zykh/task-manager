declare type ElementSize = 'xs' | 'sm' | 'md' | 'lg'

declare type ElementSizeExtract<T extends ControlSize> = Extract<ControlSize, T>
