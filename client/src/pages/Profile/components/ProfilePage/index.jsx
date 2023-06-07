import styles from './style.module.scss';
import pageGlobalStyles from '../../../pageGlobalStyle.module.scss';
import globalStyles from '../../../../styles/global.module.scss';

import SideNavbar from '../../../../components/SideNavbar';
import AuthorizationModule from '../../../../modules/AuthorizationModule';

function ProfilePage() {
  return (
    <div className={globalStyles.container}>
      <div className={globalStyles.inner}>
        <SideNavbar currentTab="profile" />

        <div className={pageGlobalStyles.content}>
          <h1 className={pageGlobalStyles.title}>Профіль</h1>

          <div className={pageGlobalStyles.content_inner}>
            <AuthorizationModule />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
