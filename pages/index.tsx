import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, ChangeEvent } from 'react'
import tw, { styled, TwStyle } from 'twin.macro'

interface FormState {
	color: 'graphite' | 'navy'
	leg: 'left' | 'right'
	sizeUpper: number
	sizeLower: number
}

const FormPage: NextPage = () => {
	const [formData, setFormData] = useState<FormState>({
		color: 'graphite',
		leg: 'left',
		sizeUpper: 0,
		sizeLower: 0,
	})

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData((formData) => ({ ...formData, [event.target.name]: event.target.value }))
	}

	return (
		<PageContainer>
			<Head>
				<title>Cionic Web UI</title>
				<meta name='description' content='Cionic Web UI Homework' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Form>
				<Options>
					<Option>
						<OptionHeader>1. Select your color:</OptionHeader>
						<OptionBody>
							<RadioWrapper>
								<RadioButton
									className='peer'
									type='radio'
									name='color'
									value='graphite'
									id='color_graphite'
									onChange={handleChange}
									checked={formData.color === 'graphite'}
								/>
								<RadioLabel htmlFor='color_graphite'>
									<Circle color='graphite' checked={formData.color === 'graphite'}></Circle>
									Graphite
								</RadioLabel>
							</RadioWrapper>

							<RadioWrapper>
								<RadioButton
									className='peer'
									type='radio'
									name='color'
									value='navy'
									id='color_navy'
									onChange={handleChange}
									checked={formData.color === 'navy'}
								/>
								<RadioLabel htmlFor='color_navy'>
									<Circle color='navy' checked={formData.color === 'navy'}></Circle>
									Navy
								</RadioLabel>
							</RadioWrapper>
						</OptionBody>
					</Option>

					<Option>
						<OptionHeader>2. Select which leg:</OptionHeader>
						<OptionBody>
							<RadioWrapper>
								<RadioButton
									className='peer'
									type='radio'
									name='leg'
									value='left'
									id='leg_left'
									onChange={handleChange}
									checked={formData.leg === 'left'}
								/>
								<RadioLabel htmlFor='leg_left'>
									<Circle checked={formData.leg === 'left'}>L</Circle>
									Left
								</RadioLabel>
							</RadioWrapper>

							<RadioWrapper>
								<RadioButton
									className='peer'
									type='radio'
									name='leg'
									value='right'
									id='leg_right'
									onChange={handleChange}
									checked={formData.leg === 'right'}
								/>
								<RadioLabel htmlFor='leg_right'>
									<Circle checked={formData.leg === 'right'}>R</Circle>
									Right
								</RadioLabel>
							</RadioWrapper>
						</OptionBody>
					</Option>

					<Option>
						<OptionHeader>3. Input your size:</OptionHeader>
						<OptionBody>{/* <input type='text'></input> */}</OptionBody>
					</Option>
				</Options>

				<FormSubmit type='submit' />
			</Form>
		</PageContainer>
	)
}

export default FormPage

const PageContainer = tw.div`
	flex
	w-screen
	h-screen
	bg-cionic-graphite
`

const Form = tw.form`
	flex
	flex-col
	w-max
	m-auto
	p-4
	bg-cionic-sky
`

const Options = tw.div`
	flex
	flex-col

	md:(
		flex-row
		w-[570px]
	)
`

const Option = tw.div`
	flex
	flex-col
	w-full

	md:(
		h-[180px]
		border-cionic-gray
		first:border-r
		last:border-l
	)
`

const OptionHeader = tw.div`
	flex-shrink-0
	h-6
	bg-cionic-graphite
	text-white
	text-center
	align-middle
	text-xs
	leading-6
	font-bold
	tracking-tighter
`

const OptionBody = tw.ul`
	flex
	flex-row
	w-full
	h-full
	p-[15px]
`

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
	tracking-tighter
	cursor-pointer

	// Having two border-color utilities in one scope was causing an editor warning for duplicate property: --tw-border-opacity
	// Temporary solution: Moved one of them out of the peer-checked scope
	border-cionic-gray
	border-opacity-0

	peer-checked:(
		border-b-cionic-cyan
	)

	peer-focus:(
		ring
		
	)
`

// Color options
type ColorVariant = 'graphite' | 'navy'

const colorVariants: Record<ColorVariant, TwStyle> = {
	graphite: tw`bg-cionic-graphite`,
	navy: tw`bg-cionic-navy`,
}

interface CircleProps {
	color?: ColorVariant
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
	`,
	color ? colorVariants[color] : tw`border border-cionic-gray`,
	!checked &&
		(color
			? tw`
		w-[25px]
		h-[25px]
		mt-2
	`
			: tw`
		border-0
		text-cionic-gray
	`),
])

const FormSubmit = tw.input`
	bg-cionic-lime
`
