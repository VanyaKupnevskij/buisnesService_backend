import styles from './style.module.scss';
import pageGlobalStyles from '../../../pageGlobalStyle.module.scss';
import globalStyles from '../../../../styles/global.module.scss';

import SideNavbar from '../../../../components/SideNavbar';
import WorkersModule from '../../../../modules/WorkersModule/components/ModuleMain';

function WorkersPage() {
  return (
    <div className={globalStyles.container}>
      <div className={globalStyles.inner}>
        <SideNavbar currentTab="workers" />

        <div className={pageGlobalStyles.content}>
          <h1 className={pageGlobalStyles.title}>Працівники</h1>
          <div className={pageGlobalStyles.content_inner}>
            <WorkersModule />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkersPage;
