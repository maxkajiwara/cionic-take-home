import { ChangeEvent } from 'react'
import tw, { styled, TwStyle } from 'twin.macro'

type Props = {
	name: string
	value: string
	color?: Color
	checked: boolean
	handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const RadioOption: React.FC<Props> = ({ name, value, color, checked, handleChange }) => {
	return (
		<RadioWrapper>
			<RadioButton
				className='peer'
				type='radio'
				name={name}
				value={value}
				id={name + value}
				onChange={handleChange}
				checked={checked}
			/>
			<RadioLabel htmlFor={name + value}>
				<Circle color={color} checked={checked}>
					{name !== 'color' && value.charAt(0).toUpperCase()}
				</Circle>
				{value.charAt(0).toUpperCase() + value.slice(1)}
			</RadioLabel>
		</RadioWrapper>
	)
}

const RadioWrapper = tw.li`
flex
w-full
h-full
`

// Screen-reader-only:
// Visually hides the element (for custom UI) while preserving accessibility
const RadioButton = tw.input`
sr-only
`

// This element visually and functionally acts as a radio button
// Its state is paired to the neighboring RadioButton using className='peer'
const RadioLabel = tw.label`
flex
flex-col
justify-between
items-center
w-full
h-[100px]
p-1.5
border
border-b-[5px]
text-sm
leading-[18px]
tracking-tighter
text-cionic-sky
cursor-pointer

// Having two border-color utilities in one scope was causing an editor warning for duplicate property: --tw-border-opacity
// Harmless solution: Moved one of them out of the peer-checked scope
border-cionic-gray-600
border-opacity-0

peer-checked:(
	border-b-cionic-cyan
	text-black
)

peer-focus-visible:(
	ring
)

hover:(
	bg-blue-50
	shadow-md
	text-cionic-gray-500
)

active:(
	bg-cionic-sky
)
`

// Color options
type Color = 'graphite' | 'navy'

const colorVariants: Record<Color, TwStyle> = {
	graphite: tw`bg-cionic-graphite`,
	navy: tw`bg-cionic-navy`,
}

interface CircleProps {
	color?: Color
	checked?: boolean
}

const Circle = styled.div<CircleProps>(({ color, checked }) => [
	tw`
	flex
	w-[50px]
	h-[50px]
	pb-1
	rounded-full
	justify-center
	items-center
	text-[41px]
	font-medium
	text-cionic-graphite
`,
	color ? colorVariants[color] : tw`border border-cionic-gray-600`,
	!checked &&
		(color
			? tw`
	w-[25px]
	h-[25px]
	mt-2
`
			: tw`
	border-0
	text-cionic-gray-600
`),
])
