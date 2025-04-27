import Title from '../Components/Title'
import { useTranslation } from 'react-i18next'

function Guide() {
  const { t } = useTranslation()
  return (
    <div className="pt-10">
      <Title title={t('navbar.guide')} />
    </div>
  )
}

export default Guide
