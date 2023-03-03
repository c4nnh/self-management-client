import { CalendarOptions } from '@fullcalendar/core'

type ToolbarConfig = {
  headerToolbar?: CalendarOptions['headerToolbar']
  titleFormat?: CalendarOptions['titleFormat']
}

export const toolbar: ToolbarConfig = {
  headerToolbar: {
    start: 'title',
    center: 'today',
    end: 'prev next dayGridMonth timeGridWeek timeGridDay',
  },
  titleFormat: { year: 'numeric', month: 'long' },
}
