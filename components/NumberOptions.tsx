import { ChangeEvent, Fragment } from 'react'
import tw from 'twin.macro'

type Props = {
	props: {
		options: { name: string; label: string; value: string }[]
		handleInput: (event: ChangeEvent<HTMLInputElement>) => void
	}
}

const NumberOptions: React.FC<Props> = ({ props: { options, handleInput } }) => (
	<InputBody>
		{options.map(({ name, label, value }) => (
			<Fragment key={name}>
				<InputLabel htmlFor='sizeUpper'>{label}</InputLabel>
				<Input
					type='number'
					name={name}
					id={name}
					value={value}
					min='0'
					max='50'
					step='any'
					placeholder='inches'
					onChange={handleInput}
					autoComplete='off'
					required
				/>
			</Fragment>
		))}
	</InputBody>
)

export default NumberOptions

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
