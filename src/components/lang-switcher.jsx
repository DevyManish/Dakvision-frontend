"use client"

import { useEffect, useState } from "react"
import { parseCookies, setCookie } from "nookies"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Languages } from 'lucide-react'

const COOKIE_NAME = "googtrans"

export default function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState()
  const [languageConfig, setLanguageConfig] = useState()

  useEffect(() => {
    const cookies = parseCookies()
    const existingLanguageCookieValue = cookies[COOKIE_NAME]

    let languageValue
    if (existingLanguageCookieValue) {
      const sp = existingLanguageCookieValue.split("/")
      if (sp.length > 2) {
        languageValue = sp[2]
      }
    }

    if (global.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
      languageValue = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage
    }

    if (languageValue) {
      setCurrentLanguage(languageValue)
    }

    if (global.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__)
    }
  }, [])

  if (!currentLanguage || !languageConfig) {
    return null
  }

  const switchLanguage = (lang) => {
    setCookie(null, COOKIE_NAME, "/auto/" + lang)
    window.location.reload()
  }

  const getCurrentLanguageTitle = () => {
    const currentLang = languageConfig.languages.find(
      (l) => l.name === currentLanguage || (currentLanguage === "auto" && languageConfig.defaultLanguage === l)
    )
    return currentLang?.title || "Select Language"
  }

  return (
    <div className="notranslate">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            <Languages className="h-4 w-4" />
            {getCurrentLanguageTitle()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {languageConfig.languages.map((language) => (
            <DropdownMenuItem
              key={language.name}
              onClick={() => switchLanguage(language.name)}
              className={
                currentLanguage === language.name ||
                (currentLanguage === "auto" && languageConfig.defaultLanguage === language)
                  ? "bg-accent"
                  : ""
              }
            >
              {language.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export { LanguageSwitcher, COOKIE_NAME }

