import type { OrderForm } from '@vtex/clients'
import { useCallback, useState } from 'react'

import type { OrderFormEventHandler } from '../typings/orderFormEvent'

export const useOrderFormMonitor = (handlers: OrderFormEventHandler[]) => {
  const [orderForm, setOrderForm] = useState<OrderForm>(
    window?.vtexjs.checkout.orderForm
  )

  const handleOrderFormChange = useCallback(
    (eventOrderForm: OrderForm) => {
      const changes = handlers.map((handler) =>
        handler(orderForm, eventOrderForm)
      )

      setOrderForm(eventOrderForm)

      return changes
    },
    [orderForm]
  )

  return handleOrderFormChange
}
