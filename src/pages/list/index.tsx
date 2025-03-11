import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const ListHomePage: FC = () => {
    const { t } = useTranslation()
    return <div>{t('welcome')} to List Home page</div>
}

export default ListHomePage
