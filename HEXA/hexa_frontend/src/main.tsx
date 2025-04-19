import * as ReactDOM from "react-dom/client";
import React, { useEffect, useState, Fragment} from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { I18nextProvider, useTranslation } from "react-i18next";
import store, { persistor, RootState } from "@/store";
import i18n from "@/utils/i18n/i18n.ts";
import mainRoute from "@/router/MainRoute.tsx";
import AlertComponent from "@/components/kendo/dialog/AlertComponent.tsx";
import { PersistGate } from 'redux-persist/integration/react';

/* Common */
import Spinner from '@/views/Spinner'; // Spinner 컴포넌트 import
/* Style */
import "./index.css";
import "./assets/css/style.css";
import SessionTimeout from "@/new_components/common/SessionTimeout.tsx";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 10,
			refetchOnWindowFocus: false,  // 전체적으로 refetchOnWindowFocus 비활성화
		},
	},
});

const RootComponent: React.FC<{ keyProp: number }> = ({ keyProp }) => {
  const isLoading = useSelector((state: RootState) => state.commonStore.isLoading);
  return (
    <Fragment>
      {isLoading && <Spinner />}
      <RouterProvider router={mainRoute} key={keyProp} />
      <AlertComponent />
      <SessionTimeout/>
    </Fragment>
  );
};

const MainApp = () => {
  const [key, setKey] = useState(0);
  const { i18n } = useTranslation();

  // i18n.language 변경 감지 → 리렌더링 트리거
  useEffect(() => {
    const handleLanguageChange = () => {
      setKey((prev) => prev + 1); // key 변경 → 전체 리렌더링
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RootComponent keyProp={key} />
          </PersistGate>
        </Provider>
      </I18nextProvider>
    </QueryClientProvider>
  );
};



// ReactDOM.createRoot(document.getElementById("root")!).render(
// 	<QueryClientProvider client={queryClient}>
// 		<I18nextProvider i18n={i18n}>
// 			<Provider store={store}>
// 				<PersistGate loading={null} persistor={persistor}>
// 					<RootComponent />
// 				</PersistGate>
// 			</Provider>
// 		</I18nextProvider>
// 	</QueryClientProvider>,
// );

ReactDOM.createRoot(document.getElementById("root")!).render(<MainApp />);
