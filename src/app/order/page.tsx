import type { Metadata } from 'next';
import { OrderRequestView } from './OrderRequestView';

export const metadata: Metadata = {
  title: 'Send an Order Request',
  robots: { index: false },
};

export default function OrderPage() {
  return <OrderRequestView />;
}
