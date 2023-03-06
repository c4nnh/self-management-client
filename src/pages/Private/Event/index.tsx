import { useGetEventsQuery } from '@/apis'
import { PageContainer } from '@/components'
import { DATE_FORMAT_FILTER } from '@/constants'
import { useEventStore } from '@/stores'
import {
  EventClickArg,
  EventDropArg,
  EventSourceInput,
} from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Button } from 'antd'
import dayjs from 'dayjs'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { toolbar } from './config'

export const Event: React.FC = () => {
  const calendarRef = React.createRef<FullCalendar>()

  const { params } = useEventStore()
  const { data: events, isLoading } = useGetEventsQuery(params)

  const formattedEvents: EventSourceInput = useMemo(
    () =>
      (events || []).map(event => {
        const {
          id,
          title,
          startDate,
          endDate,
          startTime,
          endTime,
          priority,
          ...rest
        } = event

        const start = `${dayjs(startDate).format(DATE_FORMAT_FILTER)}${
          startTime ? `T${startTime}` : ''
        }`

        const end = `${dayjs(endDate).format(DATE_FORMAT_FILTER)}${
          endTime ? `T${endTime}` : ''
        }`

        return {
          id,
          title,
          start,
          end,
          priority,
          extendedProps: rest,
        }
      }),
    [events]
  )

  // const [events, setEvents] = useState<EventSourceInput>([
  //   {
  //     id: '1',
  //     title: 'aha2',
  //     start: '2023-03-03T10:45:00',
  //     end: '2023-03-06T23:00:00',
  //     // add more props here
  //     priotiry: 2,
  //     extendedProps: {
  //       abcd: 'zzz',
  //     },
  //   },
  //   {
  //     id: '3',
  //     title: 'aha1',
  //     start: '2023-03-03T10:45:00',
  //     end: '2023-03-03T23:00:00',
  //     // add more props here
  //     priotiry: 1,
  //     abcd: 'zzz',
  //     extendedProps: {},
  //   },
  //   {
  //     id: '2',
  //     title: 'aha',
  //     start: '2023-03-04T10:45:00',
  //     end: '2023-03-04T23:00:00',
  //     extendedProps: {
  //       abcd: 'zzz',
  //     },
  //   },
  // ])

  const eventClick = (e: EventClickArg) => {
    console.log(e.event)
  }

  const onChangeView = () => {
    if (calendarRef && calendarRef.current) {
      calendarRef.current.getApi().changeView('timeGridDay')
    }
  }

  const changeData = () => {
    // setEvents([
    //   {
    //     id: '1',
    //     title: 'aha',
    //     start: '2023-04-07T10:45:00',
    //     end: '2023-04-07T23:00:00',
    //     // add more props here
    //     extendedProps: {
    //       abcd: 'zzz',
    //     },
    //   },
    // ])
  }

  const onDrop = (info: EventDropArg) => {
    console.log(info.event.extendedProps.abcd)
  }

  return (
    <StyledPageContainer>
      <Button onClick={onChangeView}>asd</Button>
      <Button onClick={changeData}>change</Button>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={formattedEvents}
        eventClick={eventClick}
        // allDaySlot={false}
        {...toolbar}
        // set duration
        slotDuration={{
          minutes: 15, // default is 30
        }}
        // slotMinTime="06:00"
        // slotMaxTime="24:00"
        // show indicator
        nowIndicator
        // show week number
        weekNumbers
        // weekText=''
        // custom day headers
        dayHeaderContent={args => {
          return <span>{args.date.getDay()}</span>
        }}
        // interaction
        // select
        selectable
        // select={infor => {
        //   console.log(infor)
        // }}
        // display
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        // order event in same day
        eventOrderStrict
        eventOrder="priotiry"
        // event popover when there is many events in same day
        eventMaxStack={3}
        // dnd
        editable
        droppable
        dragScroll
        eventDrop={onDrop}
      />
    </StyledPageContainer>
  )
}

const StyledPageContainer = styled(PageContainer)`
  ${tw`py-0`}
`
