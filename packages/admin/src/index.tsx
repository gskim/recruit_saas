import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { configureStore } from 'redux/store'
import { QueryClient, QueryClientProvider } from 'react-query'

import { registerLocale } from 'react-datepicker'
import ko from 'date-fns/locale/ko'
registerLocale('ko', ko)
const queryClient = new QueryClient()
ReactDOM.render(
    <Provider store={configureStore({})}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </Provider>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
