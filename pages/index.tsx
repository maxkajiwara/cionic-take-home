import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, ChangeEvent, FormEvent } from 'react'
import tw from 'twin.macro'
import { RadioOption } from '../components/RadioOption'

export interface FormState {
	color: 'graphite' | 'navy'
	leg: 'left' | 'right'
	sizeUpper: number
	sizeLower: number
}

interface Status {
	fetching: boolean
	success: boolean
	error: string
}

const FormPage: NextPage = () => {
	const [formData, setFormData] = useState<FormState>({
		color: 'graphite',
		leg: 'left',
		sizeUpper: 0,
		sizeLower: 0,
	})

	const [status, setStatus] = useState<Status>({
		fetching: false,
		success: false,
		error: '',
	})

	// Handle change to form input
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData((formData) => ({ ...formData, [event.target.name]: event.target.value }))
	}

	// Handle change to number input
	const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
		const value = handleDecimalValue(event.target.value)

		setFormData((formData) => ({
			...formData,
			[event.target.name]: value,
		}))

		if (value > 50) {
			setStatus((status) => ({
				...status,
				error: 'Value must be between 0 and 50',
			}))
		} else {
			setStatus((status) => ({
				...status,
				error: '',
			}))
		}
	}

	// Handle string validation for number input field
	const handleDecimalValue = (value: string) => {
		// Remove extra leading zeroes and allow up to two decimal digits
		const regex = /(?!0\d)([0-9]*[.]{0,1}[0-9]{0,2})/s
		const result = value.match(regex)

		return result ? result[0] : 0
	}

	// Handle the submit event on form submit
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		// Stop the form from submitting and refreshing the page
		event.preventDefault()

		const endpoint = '/api/form'
		const JSONdata = JSON.stringify(formData)
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSONdata,
		}

		setStatus((status) => ({ ...status, fetching: true, error: '' }))

		const response = await fetch(endpoint, options)
		const result = await response.json()

		if (result.data === 'Success') {
			setStatus((status) => ({ ...status, fetching: false, success: true }))
		} else {
			setStatus((status) => ({
				...status,
				fetching: false,
				error: 'Error: Could not add to cart',
			}))
		}
	}

	// Handle continue from success state
	const handleContinue = () => {
		setStatus((status) => ({ ...status, success: false }))
	}

	return (
		<PageContainer>
			<Head>
				<title>Cionic Web UI</title>
				<meta name='description' content='Cionic Web UI Homework' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Form onSubmit={handleSubmit}>
				<FieldSet disabled={status.fetching}>
					<Options>
						<Option>
							<OptionHeader>1. Select your color:</OptionHeader>
							<RadioBody>
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
							</RadioBody>
						</Option>

						<Option>
							<OptionHeader>2. Select which leg:</OptionHeader>
							<RadioBody>
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
							</RadioBody>
						</Option>

						<Option>
							<OptionHeader>3. Input your size:</OptionHeader>
							<InputBody>
								<InputLabel htmlFor='sizeUpper'>Upper Leg (Inches)</InputLabel>
								<Input
									type='number'
									name='sizeUpper'
									id='sizeUpper'
									value={formData.sizeUpper || ''}
									min='0'
									max='50'
									step='any'
									placeholder='inches'
									onChange={handleInput}
									autoComplete='off'
									required
								/>

								<InputLabel htmlFor='sizeLower'>Lower Leg (inches)</InputLabel>
								<Input
									type='number'
									name='sizeLower'
									id='sizeLower'
									value={formData.sizeLower || ''}
									min='0'
									max='50'
									step='any'
									placeholder='inches'
									onChange={handleInput}
									autoComplete='off'
									required
								/>
							</InputBody>
						</Option>
					</Options>

					<SubmitWrapper>
						<ErrorMessage>{status.error}</ErrorMessage>

						<FormSubmit type='submit' value={status.fetching ? 'Adding . . .' : 'Add to Cart'} />
					</SubmitWrapper>
				</FieldSet>

				{status.success && (
					<SuccessModal>
						<SuccessMessage>Success! Added to Cart</SuccessMessage>
						<FormSubmit type='button' value='Continue' onClick={handleContinue} />
					</SuccessModal>
				)}
			</Form>
		</PageContainer>
	)
}

export default FormPage

const PageContainer = tw.div`
	flex
	w-full
`

const Form = tw.form`
	relative
	flex
	flex-col
	w-full
	max-w-sm
	mx-auto
	p-4

	md:(
		w-[602px]
		max-w-none

		// For testing standalone component
		mt-[30vh]
		shadow-md
	)
`

// Allows disabling of all form inputs, as in during fetching state
const FieldSet = tw.fieldset`
		flex
		flex-col
		// m-4
`

const Options = tw.div`
	flex
	flex-col

	md:(
		flex-row
	)
`

const Option = tw.div`
	flex
	flex-col
	w-full

	md:(
		h-[180px]
		border-cionic-gray-600
		first:border-r
		last:border-l
	)
`

const OptionHeader = tw.div`
	flex-shrink-0
	align-middle
	h-7
	bg-cionic-graphite
	text-white
	text-center
	text-base
	leading-7
	font-semibold

	md:(
		h-6
		text-sm
		leading-[22px]
		tracking-[-0.09em]
	)
`

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

const InputBody = tw.ul`
	flex
	flex-col
	items-center
	w-full
	h-full
	pt-3

	md:(
		pt-2
	)
`

const InputLabel = tw.label`
	text-lg
	font-medium
	tracking-[-0.08em]

	md:(
		text-sm
	)
`

const Input = tw.input`
	w-3/5
	h-12
	border
	border-cionic-gray-400
	rounded
	mt-[3px]
	mb-2
	text-center
	text-lg
	font-medium
	leading-3
	tracking-tighter

	placeholder:(
		text-cionic-gray-600
	)

	focus-visible:(
		outline-none
		ring
	)

	out-of-range:(
		border-red-600
	)

	md:(
		w-28
		h-[38px]
		text-sm
	)
`

const SubmitWrapper = tw.div`
	flex
	flex-col
	items-center
	
	
	md:(
		flex-row
		pt-5
	)
`

const ErrorMessage = tw.p`
	flex
	justify-center
	w-full
	h-7
	text-red-500
	text-sm
	font-medium
	tracking-tight

	md:(
		items-end
	)
`

const FormSubmit = tw.input`
	flex-shrink-0
	w-4/5
	h-16
	bg-cionic-lime
	rounded-sm
	text-xl
	underline
	font-extrabold
	whitespace-normal
	cursor-pointer

	focus-visible:(
		outline-none
		ring
	)

	hover:(
		text-white
		shadow-md
	)

	active:(
		text-gray-100
	)

	disabled:(
		text-white
	)

	md:(
		w-full
		max-w-[195px]
		h-[50px]
		mr-[30px]
		text-base
		no-underline
	)
`

const SuccessModal = tw.div`
	absolute
	top-0
	left-0
	flex
	flex-col
	justify-center
	items-center
	w-full
	h-full
	bg-cionic-sky
	p-11
`

const SuccessMessage = tw.p`
	pb-[50px]
	text-2xl
	tracking-tight

	md:(
		mt-auto
	)
`
