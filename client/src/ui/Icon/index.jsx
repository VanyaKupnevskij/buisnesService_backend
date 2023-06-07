import styles from './style.module.scss';

import logoutImage from '../images/logout.svg';
import graphicImage from '../images/graphic.svg';
import workersImage from '../images/workers.svg';
import recordsImage from '../images/records.svg';
import generalImage from '../images/general.svg';
import projectsImage from '../images/projects.svg';
import contactsImage from '../images/contacts.svg';
import homeImage from '../images/home.svg';

function Icon({ width, height, style, className = '', src }) {
  const _className = `${styles.root} ${className}`;

  return <img className={_className} style={style} src={src} width={width} height={height} />;
}

function LogoutIcon({ width, height, style, className = '' }) {
  return (
    <Icon style={style} className={className} width={width} height={height} src={logoutImage} />
  );
}

function GraphicIcon({ width, height, style, className = '' }) {
  return (
    <Icon style={style} className={className} width={width} height={height} src={graphicImage} />
  );
}

function WorkersIcon({ width, height, style, className = '' }) {
  return (
    <Icon style={style} className={className} width={width} height={height} src={workersImage} />
  );
}

function RecordsIcon({ width, height, style, className = '' }) {
  return (
    <Icon style={style} className={className} width={width} height={height} src={recordsImage} />
  );
}

function GeneralIcon({ width, height, style, className = '' }) {
  return (
    <Icon style={style} className={className} width={width} height={height} src={generalImage} />
  );
}

function ProjectsIcon({ width, height, style, className = '' }) {
  return (
    <Icon style={style} className={className} width={width} height={height} src={projectsImage} />
  );
}

function ContactsIcon({ width, height, style, className = '' }) {
  return (
    <Icon style={style} className={className} width={width} height={height} src={contactsImage} />
  );
}

function HomeIcon({ width, height, style, className }) {
  return <Icon style={style} className={className} width={width} height={height} src={homeImage} />;
}

export {
  LogoutIcon,
  GraphicIcon,
  WorkersIcon,
  RecordsIcon,
  GeneralIcon,
  ProjectsIcon,
  ContactsIcon,
  HomeIcon,
};
