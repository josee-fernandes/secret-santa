import { Dices } from 'lucide-react'
import { Button } from './ui/button'
import { useCallback } from 'react'

interface RaffleProps {
  participants: Participants
}

export const Raffle: React.FC<RaffleProps> = ({ participants }) => {
  const indexes = Array.from({ length: participants.length }, (_, i) => i)

  const handleRaffle = useCallback(() => {
    try {
      const randomIndexes = indexes.slice()

      let hasEqual = true

      while (hasEqual) {
        randomIndexes.sort(() => Math.random() - 0.5)

        hasEqual = randomIndexes.some((index, i) => index === i)
      }

      for (const [index, participant] of participants.entries()) {
        const pickedIndex = randomIndexes[index]
        const picked = participants[pickedIndex]

        console.log(
          `${participant.name} (${participant.phone}) pegou ${picked.name} (${picked.phone})`,
        )
      }
    } catch (error) {
      console.error(error)
    }
  }, [indexes, participants])

  return (
    <div className="mt-10 flex justify-center">
      <Button className="w-full gap-2 max-w-96" onClick={handleRaffle}>
        <Dices className="size-4" />
        Sortear
      </Button>
    </div>
  )
}

Raffle.displayName = 'Raffle'
