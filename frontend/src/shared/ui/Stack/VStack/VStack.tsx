import { ComponentPropsWithoutRef, ElementType } from 'react'

import { Flex, FlexProps } from '../Flex/Flex'

type VStackProps<T extends ElementType> = Omit<FlexProps<T>, 'direction'>

export const VStack = <T extends ElementType = 'div'>(
	props: VStackProps<T> & ComponentPropsWithoutRef<T>
) => {
	return <Flex {...props} direction='column' />
}
