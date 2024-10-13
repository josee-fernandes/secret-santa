import { ThemeToggler } from '@/components/theme-toggler'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { v4 as uuidV4 } from 'uuid'
import { toast } from 'sonner'
import { Trash } from 'lucide-react'
import { Raffle } from '@/components/raffle'

const addParticipantSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
})

type AddParticipantFormData = z.infer<typeof addParticipantSchema>

const sample: Participants = [
  {
    id: uuidV4(),
    name: 'AAAAA',
    phone: '(00) 91234-5678',
  },
  {
    id: uuidV4(),
    name: 'BBBBB',
    phone: '(11) 91234-5678',
  },
  {
    id: uuidV4(),
    name: 'CCCCC',
    phone: '(22) 91234-5678',
  },
  {
    id: uuidV4(),
    name: 'DDDDD',
    phone: '(33) 91234-5678',
  },
  {
    id: uuidV4(),
    name: 'EEEEE',
    phone: '(44) 91234-5678',
  },
  {
    id: uuidV4(),
    name: 'FFFFF',
    phone: '(55) 91234-5678',
  },
  {
    id: uuidV4(),
    name: 'GGGGG',
    phone: '(66) 91234-5678',
  },
  {
    id: uuidV4(),
    name: 'HHHHH',
    phone: '(77) 91234-5678',
  },
  {
    id: uuidV4(),
    name: 'IIIII',
    phone: '(88) 91234-5678',
  },
  {
    id: uuidV4(),
    name: 'JJJJJ',
    phone: '(99) 91234-5678',
  },
]

const Home: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<AddParticipantFormData>({
    defaultValues: {
      name: '',
      phone: '',
    },
    resolver: zodResolver(addParticipantSchema),
  })

  const [participants, setParticipants] = useState<Participants>(sample)

  const handleAddParticipant = useCallback(
    (data: AddParticipantFormData) => {
      try {
        const participant = {
          id: uuidV4(),
          name: data.name,
          phone: data.phone,
        }

        setParticipants((oldParticipants) => [...oldParticipants, participant])

        toast.success('Sucesso!', {
          description: 'Participante adicionado com sucesso!',
        })

        reset()
      } catch (error) {
        console.error(error)
      }
    },
    [reset],
  )

  const handleRemoveParticipant = useCallback((id: string) => {
    try {
      setParticipants((oldParticipants) =>
        oldParticipants.filter((participant) => participant.id !== id),
      )
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <div className="bg-background">
      <nav className="flex justify-between items-center px-6 py-4 border-b">
        <h1 className="text-center text-2xl font-bold text-primary">
          Secret Santa
        </h1>
        <ThemeToggler />
      </nav>
      <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-4 py-10 px-6">
        <form
          className="flex gap-2 flex-wrap flex-col md:flex-row justify-center items-center"
          onSubmit={handleSubmit(handleAddParticipant)}
        >
          <Input
            className="max-w-96 w-full"
            placeholder="Nome do participante"
            {...register('name')}
          />
          <Input
            className="max-w-96 w-full"
            type="tel"
            placeholder="(00) 91234-5678"
            {...register('phone')}
          />
          <Button className="w-full max-w-96 md:w-max" type="submit">
            Adicionar participante
          </Button>
        </form>

        {participants.length > 0 && (
          <>
            <Raffle participants={participants} />
            <div className="flex flex-col gap-4 mt-10">
              <h2 className="text-xl font-bold">Participantes</h2>
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="group border rounded p-4 bg-card flex justify-between gap-4"
                >
                  <div>
                    <p>{participant.name}</p>
                    <span className="text-muted-foreground font-semibold text-sm">
                      {participant.phone}
                    </span>
                  </div>
                  <div>
                    <Button
                      className="group-hover:opacity-100 md:opacity-0 transition-all"
                      size="icon"
                      variant="destructive"
                      onClick={() => handleRemoveParticipant(participant.id)}
                    >
                      <Trash className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

Home.displayName = 'Home'

export default Home
