import LogoIcon from '@/shared/assets/icons/logo.svg?react'
import {Link} from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link to={'/'}>
        <LogoIcon width={101} hanging={25}/>
      </Link>
    </div>
  );
};

export default Logo;