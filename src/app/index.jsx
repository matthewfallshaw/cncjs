import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { Provider as GridSystemProvider } from 'app/components/GridSystem';
import App from 'app/containers/App';
import rootSaga from 'app/sagas';
import reduxStore from 'app/store/redux';
import sagaMiddleware from 'app/store/redux/sagaMiddleware';
import i18next from './i18next';
import './styles/vendor.styl';
import './styles/app.styl';

const container = document.createElement('div');
document.body.appendChild(container);

// Run saga middleware
sagaMiddleware.run(rootSaga);

export const GlobalProvider = ({ children }) => (
    <ReduxProvider store={reduxStore}>
        <GridSystemProvider
            breakpoints={[576, 768, 992, 1200, 1600]}
            containerWidths={[540, 720, 960, 1140]}
            columns={12}
            gutterWidth={0}
            layout="flexbox"
        >
            <I18nextProvider i18n={i18next}>
                {children}
            </I18nextProvider>
        </GridSystemProvider>
    </ReduxProvider>
);

ReactDOM.render(
    <GlobalProvider>
        <HashRouter>
            <App />
        </HashRouter>
    </GlobalProvider>,
    container
);