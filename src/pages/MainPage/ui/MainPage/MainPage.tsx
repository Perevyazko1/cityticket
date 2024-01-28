import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {MapLoader} from "../../../../features/MapLoader/MapLoader";
import {PageWrapper} from "../../../../shared/ui/PageWrapper/PageWrapper";

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

    return (
        <PageWrapper>
            <div
                className={classNames('', mods, [className])}
                {...otherProps}
            >
                {children}
                <MapLoader/>
            </div>
        </PageWrapper>
    );
});
export default MainPage