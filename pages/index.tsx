import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, ChangeEvent, FormEvent } from 'react'
import tw from 'twin.macro'
import RadioOption from '../components/RadioOption'
import NumberOptions from '../components/NumberOptions'

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
	// Form state
	const [formData, setFormData] = useState<FormState>({
		color: 'graphite',
		leg: 'left',
		sizeUpper: 0,
		sizeLower: 0,
	})

	// Status state
	const [status, setStatus] = useState<Status>({
		fetching: false,
		success: false,
		error: '',
	})

	// Handle change to radio input
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData((formData) => ({ ...formData, [event.target.name]: event.target.value }))
	}

	// Handle change to number input
	const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
		const value = handleDecimalValue(event.target.value)

		// Update state
		setFormData((formData) => ({
			...formData,
			[event.target.name]: value,
		}))

		// Update error message
		if (value > 50) {
			setStatus((status) => ({ ...status, error: 'Value must be between 0 and 50' }))
		} else {
			setStatus((status) => ({ ...status, error: '' }))
		}
	}

	// Handle string validation for number input
	const handleDecimalValue = (value: string) => {
		// Remove extra leading zeroes and allow up to two decimal digits
		const regex = /(?!0\d)([0-9]*[.]{0,1}[0-9]{0,2})/s
		const result = value.match(regex)

		return result ? result[0] : 0
	}

	// Handle the submit event on form submit
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		// Set fetching state
		setStatus((status) => ({ ...status, fetching: true, error: '' }))

		// pages/api/form.ts
		const endpoint = '/api/form'
		const JSONdata = JSON.stringify(formData)
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSONdata,
		}

		const response = await fetch(endpoint, options)
		const result = await response.json()

		// Reset fetching state and update status
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

	// And here's our component!
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
							<RadioOption
								props={{
									name: 'color',
									values: ['graphite', 'navy'],
									checked: formData.color,
									handleChange,
								}}
							/>
						</Option>

						<Option>
							<OptionHeader>2. Select which leg:</OptionHeader>
							<RadioOption
								props={{
									name: 'leg',
									values: ['left', 'right'],
									checked: formData.leg,
									handleChange,
								}}
							/>
						</Option>

						<Option>
							<OptionHeader>3. Input your size:</OptionHeader>
							<NumberOptions
								props={{
									options: [
										{ label: 'Upper Leg (Inches)', name: 'sizeUpper', value: formData.sizeUpper },
										{ label: 'Lower Leg (Inches)', name: 'sizeLower', value: formData.sizeLower },
									],
									handleInput,
								}}
							/>
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
