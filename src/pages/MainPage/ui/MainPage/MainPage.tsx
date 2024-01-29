import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {MapLoader} from "features/MapLoader/MapLoader";
import {PageWrapper} from "shared/ui/PageWrapper/PageWrapper";
import {useWindowWidth} from "shared/hooks/useWindowWidth/useWindowWidth";

interface MainPageProps {
    className?: string
    children?: ReactNode
}


const MainPage = memo((props: MainPageProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {};
    const pageWidth = useWindowWidth();


    return (
        <div>
            {pageWidth <= 1100 ?
                <div>Не для мобильных устройств</div>
                : <PageWrapper>
                    <div
                        className={classNames('', mods, [className])}
                        {...otherProps}
                    >
                        {children}
                        <MapLoader/>
                    </div>
                </PageWrapper>}


        </div>
    );
});
export default MainPage