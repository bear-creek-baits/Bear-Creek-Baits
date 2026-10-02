import Link from 'next/link';
import { ProductArt } from '@/components/product/ProductArt';
import styles from './pages.module.css';

export default function NotFound() {
  return (
    <section className="section">
      <div className={`container ${styles.narrow} ${styles.center}`}>
        <div className={styles.lostArt} aria-hidden="true">
          <ProductArt kind="hair-jig" color="hair-black-chartreuse" angle={-30} />
        </div>
        <h1 className={styles.h1}>Snagged</h1>
        <p className={styles.lead}>That page isn’t here. It may have moved, or the link is wrong.</p>
        <Link href="/shop/" className="btn">
          Go to the shop
        </Link>
      </div>
    </section>
  );
}
