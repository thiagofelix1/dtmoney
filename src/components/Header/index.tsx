import logoImg from '../../assets/logo.svg';
import { Container, Content } from './styles';

interface HeaderProps {
    onOpesNewTransactionModal: () => void;
}

export function Header({ onOpesNewTransactionModal }: HeaderProps) {


    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dt money" />
                <button type="button" onClick={onOpesNewTransactionModal}>
                    Nova Transação
                </button>


            </Content>
        </Container>
    );
}