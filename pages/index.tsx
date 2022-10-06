import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, ChangeEvent } from 'react'
import tw from 'twin.macro'
import { RadioOption } from '../components/RadioOption'

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
							<RadioOption
								name='color'
								value='graphite'
								color='graphite'
								handleChange={handleChange}
								checked={formData.color === 'graphite'}
							/>

							<RadioOption
								name='color'
								value='navy'
								color='navy'
								handleChange={handleChange}
								checked={formData.color === 'navy'}
							/>
						</OptionBody>
					</Option>

					<Option>
						<OptionHeader>2. Select which leg:</OptionHeader>
						<OptionBody>
							<RadioOption
								name='leg'
								value='left'
								handleChange={handleChange}
								checked={formData.leg === 'left'}
							/>

							<RadioOption
								name='leg'
								value='right'
								handleChange={handleChange}
								checked={formData.leg === 'right'}
							/>
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

const FormSubmit = tw.input`
	bg-cionic-lime
`
