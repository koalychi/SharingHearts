import './Footer.css';
import { AiFillGithub} from 'react-icons/ai';
import { DiJira } from 'react-icons/di';

function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="connections">
                    <a href="https://koalychi.atlassian.net/jira/software/projects/AKP/boards/1" id="jira"><DiJira /></a>
                    <a href="https://github.com/MaratkanovaAlexandra/koalychi" target="_blank" rel="noreferrer" id="github"><AiFillGithub /></a>
                </div>
                © 2023 SharingHearts
            </div>
        </footer >
    )
}

export default Footer;