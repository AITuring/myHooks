import editorIcon from '@/assets/editorIcon.png';
import style from './index.module.css';
const Header = () => {
    return (
        <div className={style.header}>
            <img src={editorIcon} alt="Editor Icon" className={style.headerIcon}/>
            <div>React PlayGround</div>
        </div>
    )
}

export default Header;
