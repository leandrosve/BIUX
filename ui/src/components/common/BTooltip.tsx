import { Tooltip, TooltipProps } from '@chakra-ui/react'
import React from 'react'


const BTooltip = (props: TooltipProps) => {
  return (
    <Tooltip {...props} maxWidth='60vw' closeDelay={1000000000} boxSizing='border-box'>
        {props.children}
    </Tooltip>
  )
}

export default BTooltip