'use client'

import { ProgressProvider } from '@bprogress/next/app'

export const ProgressBarProvider = () => {
	return (
		<ProgressProvider
			height='3px'
			color={'#2845D6'}
			options={{ showSpinner: false }}
			shallowRouting
		/>
	)
}
