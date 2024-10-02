import clsx from 'clsx'
import React from 'react'

export default function Button({children}) {
  return (
    <Button className={clsx(
        'border'
    )}>
        {children}
    </Button>
  )
}
