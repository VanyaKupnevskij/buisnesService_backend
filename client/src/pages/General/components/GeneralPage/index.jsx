import styles from './style.module.scss';
import pageGlobalStyles from '../../../pageGlobalStyle.module.scss';
import globalStyles from '../../../../styles/global.module.scss';

import SideNavbar from '../../../../components/SideNavbar';
import GeneralModule from '../../../../modules/GeneralModule';
import { useEffect, useRef } from 'react';

function GeneralPage() {
  const refContentInner = useRef();

  function scrollToRef(ref) {
    ref.current.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    scrollToRef(refContentInner);
  }, []);

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles.inner}>
        <SideNavbar currentTab="general" />

        <div className={pageGlobalStyles.content}>
          <h1 className={pageGlobalStyles.title}>Основне</h1>
          <div className={pageGlobalStyles.content_inner} ref={refContentInner}>
            <GeneralModule />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralPage;
