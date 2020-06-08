import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {I18nProvider} from "@lingui/react";
import {i18n} from "@lingui/core";
import {t, Trans} from "@lingui/macro";

i18n.loadLocaleData("en", {});
i18n.loadLocaleData("ja", {});

export async function activate(locale: string) {
  const { messages } = await import(
    /* webpackChunkName: "i18n-[index]" */ `./locales/${locale}/messages.js`
  );
  i18n.load(locale, messages);
  i18n.activate(locale);
}

activate("en");

const Message = () => {
  return <><h1>{t`msgid`}</h1><h2><Trans>msgid</Trans></h2></>;
}

const Switcher = () => {
  const [locale, setLocale] = useState("en");
  return <select value={locale} onChange={e => {
    activate(e.target.value);
    setLocale(e.target.value);
  }}><option value="en">English</option><option value="ja">日本語</option></select>
}

ReactDOM.render(
  <React.StrictMode>
    <I18nProvider i18n={i18n}>
      <Message />
      <Switcher />
    </I18nProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
