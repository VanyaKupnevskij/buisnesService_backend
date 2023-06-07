import styles from './style.module.scss';
import pageGlobalStyles from '../../../pageGlobalStyle.module.scss';
import globalStyles from '../../../../styles/global.module.scss';

import SideNavbar from '../../../../components/SideNavbar';
import GraphicsModule from '../../../../modules/GraphicsModule/';

function GraphicsPage() {
  return (
    <div className={globalStyles.container}>
      <div className={globalStyles.inner}>
        <SideNavbar currentTab="graphics" />

        <div className={pageGlobalStyles.content}>
          <h1 className={pageGlobalStyles.title}>Графіки</h1>
          <div className={pageGlobalStyles.content_inner}>
            <GraphicsModule />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraphicsPage;
