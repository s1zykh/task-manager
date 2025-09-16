import { ComponentPropsWithoutRef, ElementType } from 'react'

import { Flex, FlexProps } from '../Flex/Flex'

export type HStackProps<T extends ElementType> = Omit<FlexProps<T>, 'direction'>

export const HStack = <T extends ElementType = 'div'>(
	props: HStackProps<T> & ComponentPropsWithoutRef<T>
) => {
	return <Flex {...props} direction='row' />
}
