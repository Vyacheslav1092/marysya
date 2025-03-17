import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {FC} from "react";

interface ILoadingProps {
	count: number,
}

const Loading: FC<ILoadingProps> = ({count}) => {
	return (
		<SkeletonTheme baseColor={'#202020'} highlightColor={'#444'}>
			<Skeleton count={count} height={'100%'}/>
		</SkeletonTheme>
	)
}

export default Loading;
