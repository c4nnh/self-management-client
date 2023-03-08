import { useGetEventsQuery } from '@/apis'
import { PageContainer } from '@/components'
import { DATE_FORMAT_FILTER } from '@/constants'
import { DayOfWeek } from '@/models'
import { useEventStore } from '@/stores'
import { getDayOfWeekLabel } from '@/utils'
import {
  EventClickArg,
  EventDropArg,
  EventSourceInput,
} from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayjs from 'dayjs'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import tw from 'twin.macro'
import { toolbar } from './config'

export const Event: React.FC = () => {
  const { t } = useTranslation()
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
    <PageContainer>
      <FullCalendarWrapper>
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
            return (
              <span>
                {getDayOfWeekLabel(t)[args.date.getDay() as DayOfWeek]}
              </span>
            )
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
          allDayContent={() => (
            <span className="text-xs">{t('calendar.allDay')}</span>
          )}
          // slotLabelFormat={({ date }) => `${date.hour}:${date.minute}`}
          slotLabelFormat={{
            hour: '2-digit',
            minute: '2-digit',
            // omitZeroMinute: true,
            // meridiem: 'short',
            hour12: false,
          }}
          scrollTime="09:00:00"
          firstDay={1}
          weekNumberContent={({ num }) => (
            <span>{`${t('calendar.week.title')} ${num}`}</span>
          )}
          locale="en-GB"
        />
      </FullCalendarWrapper>
    </PageContainer>
  )
}

const FullCalendarWrapper = styled.div`
  ${tw`h-full`}

  .fc {
    ${tw`h-full`}

    .fc-view-harness {
      .fc-view {
        table {
          thead > tr > th > .fc-scroller-harness > .fc-scroller {
            overflow: unset !important;
          }

          tbody {
            tr:first-child {
              td > .fc-scroller-harness > .fc-scroller {
                overflow: unset !important;
              }
            }
          }
        }
      }
    }
  }
  .fc-view-harness {
    ${tw`!h-full`}
  }

  .fc-daygrid-week-number {
    ${tw`bg-gray-200 p-0`}
  }

  .fc-timegrid-axis-frame {
    ${tw`justify-center`}
  }

  .fc-timegrid-slot-label-frame {
    ${tw`flex items-center justify-center text-xs`}
  }

  .fc-daygrid-day-top {
    ${tw`text-xs text-primary`}
  }

  .fc-day-other {
    .fc-daygrid-day-top {
      ${tw`text-black`}
    }
  }

  .fc-day-today {
    ${tw`!bg-gray-300`}
  }

  .fc-col-header-cell-cushion,
  .fc-daygrid-week-number {
    ${tw`text-gray-500 font-light`}
  }

  .fc-col-header-cell-cushion,
  .fc-timegrid-axis-cushion {
    ${tw`text-xs text-center`}
  }

  .fc-daygrid-week-number {
    ${tw`!text-[10px]`}
  }
`
