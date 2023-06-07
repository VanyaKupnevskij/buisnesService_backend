import styles from './style.module.scss';
import pageGlobalStyles from '../../../pageGlobalStyle.module.scss';
import globalStyles from '../../../../styles/global.module.scss';

import SideNavbar from '../../../../components/SideNavbar';
import ProjectsModule from '../../../../modules/ProjectsModule';

function ProjectsPage() {
  return (
    <div className={globalStyles.container}>
      <div className={globalStyles.inner}>
        <SideNavbar currentTab="projects" />

        <div className={pageGlobalStyles.content}>
          <h1 className={pageGlobalStyles.title}>Проекти</h1>
          <div className={pageGlobalStyles.content_inner}>
            <ProjectsModule />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
