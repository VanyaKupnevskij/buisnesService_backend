import styles from './style.module.scss';
import pageGlobalStyles from '../../../pageGlobalStyle.module.scss';
import globalStyles from '../../../../styles/global.module.scss';

import SideNavbar from '../../../../components/SideNavbar';

import emailImage from '../../../images/email1.svg';
import phoneImage from '../../../images/phone1.svg';
import locationImage from '../../../images/location1.svg';

function ContactsPage() {
  return (
    <div className={globalStyles.container}>
      <div className={globalStyles.inner}>
        <SideNavbar currentTab="contacts" />

        <div className={pageGlobalStyles.content}>
          <h1
            className={pageGlobalStyles.title}
            style={{ visibility: 'hidden', position: 'fixed' }}>
            Контакти
          </h1>
          <div className={styles.info}>
            <h3 className={styles.sub_title}>Зв'яжіться з нами</h3>
            <div className={styles.line}></div>
            <a className={styles.row} href="mailto:some_email@gmail.com">
              <img src={emailImage} alt="email" />
              <p className="">some_email@gmail.com</p>
            </a>
            <a className={styles.row} href="tel:096-123-4567">
              <img src={phoneImage} alt="phone" />
              <p className="">096-123-4567</p>
            </a>
            <a
              className={styles.row}
              target="_blank"
              href="https://www.google.com/maps/place/Underground+StandUp+Club/@50.449213,30.513724,14z/data=!4m6!3m5!1s0x40d4cf7d6ed71c91:0xe6974b5a5764d3b9!8m2!3d50.4492126!4d30.5137239!16s%2Fg%2F11rq0n589j?hl=ru-RU&entry=ttu">
              <img src={locationImage} alt="location" />
              <p className="">вулиця Золотоворітська, 15, Київ</p>
            </a>
          </div>
          <iframe
            width="100%"
            height="100%"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=Underground StandUp Club вулиця Золотоворітська, 15, Київ, 01034&t=&z=14&ie=UTF8&iwloc=&output=embed"></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactsPage;
