import { ChangeEvent } from 'react'
import tw, { styled, TwStyle } from 'twin.macro'

type Props = {
	props: {
		name: string
		values: string[]
		handleChange: (event: ChangeEvent<HTMLInputElement>) => void
		checked: string
	}
}

// This format should be easier to adapt to additional color options
const RadioOption: React.FC<Props> = ({ props: { name, values, handleChange, checked } }) => (
	<RadioBody>
		{values.map((value) => {
			const selfChecked = value === checked

			return (
				<PeerWrapper key={name + value}>
					<RadioButton
						className='peer'
						type='radio'
						name={name}
						value={value}
						id={name + value}
						onChange={handleChange}
						checked={selfChecked}
					/>
					<RadioLabel htmlFor={name + value}>
						<Circle color={value} checked={selfChecked}>
							{name !== 'color' && value.charAt(0).toUpperCase()}
						</Circle>
						{value.charAt(0).toUpperCase() + value.slice(1)}
					</RadioLabel>
				</PeerWrapper>
			)
		})}
	</RadioBody>
)

export default RadioOption

const RadioBody = tw.ul`
	flex
	flex-row
	w-full
	h-full
	pt-[18px]
	px-3
	pb-7

	md:(
		p-[14px]
	)
`

// Necessary replacement for React.Fragment due to peer class
const PeerWrapper = tw.div`
	flex
	w-full
	h-full
	flex-wrap
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

// Add colors here to extend options
// (Needs some additional styling for flex-wrapping but you get the idea)
const colorVariants: Record<string, TwStyle> = {
	graphite: tw`bg-cionic-graphite`,
	navy: tw`bg-cionic-navy`,
	// red: tw`bg-red-900`,
}

interface CircleProps {
	color: string
	checked: boolean
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
	colorVariants[color] || tw`border border-cionic-gray-600`,
	!checked &&
		(colorVariants[color]
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
