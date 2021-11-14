import Modal from 'react-modal';
import { TransactionTypeContainer, Container, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useState } from 'react';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {

    const [type, setType] = useState('deposit');

    function handleCreateNewTransaction(event: React.FormEvent) {
        event.preventDefault();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button">
                <img src={closeImg}
                    alt="Fechar modal"
                    onClick={onRequestClose}
                    className="react-modal-close" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>

                <input
                    placeholder="Título"
                />
                <input
                    placeholder="Valor"
                    type="number"
                />

                <TransactionTypeContainer>

                    <RadioBox
                        type="button"
                        onClick={() => { setType('deposit') }}
                        isActive={type === 'deposit'}
                        activiteColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        onClick={() => { setType('without') }}
                        isActive={type === 'without'}
                        activiteColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>

                </TransactionTypeContainer>

                <input
                    placeholder="Categoria"
                />

                <button type="submit">Cadastrar</button>

            </Container>
        </Modal>
    )
}