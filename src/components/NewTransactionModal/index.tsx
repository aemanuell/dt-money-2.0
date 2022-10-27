import * as Dialog from "@radix-ui/react-dialog"
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react"
import { CloseButton, Content, Overlay, TransactionsType, TransactionsTypeButton } from "./styles"
import * as z from "zod";
import {zodResolver} from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";

const newTransactionsFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    // type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionsFormSchema>;


export function NewTransactionModal(){
    const { 
        register, 
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionsFormSchema),
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs){
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log(data)
    }

    return (
        <Dialog.Portal>
            <Overlay/>

            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>
                
                 <CloseButton>
                    <X size={24}/>
                 </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input 
                        type="text" 
                        placeholder="Descrição" 
                        required 
                        {...register('description')}
                    />
                    <input 
                        type="number" 
                        placeholder="Preço" 
                        required 
                        {...register('price', {valueAsNumber: true})}
                    />
                    <input 
                        type="text" 
                        placeholder="Categoria" 
                        required 
                        {...register('category')}
                    />
                    
                    <TransactionsType>
                        <TransactionsTypeButton variant="income" value="income">
                            <ArrowCircleUp size={24}/>
                            Entrada
                        </TransactionsTypeButton>

                        <TransactionsTypeButton variant="outcome" value="outcome">
                            <ArrowCircleDown size={24}/>
                            Saída
                        </TransactionsTypeButton>
                    </TransactionsType>

                    <button type="submit" disabled={isSubmitting}>
                        Cadastrar
                    </button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}