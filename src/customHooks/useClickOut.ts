import {useEvt} from "evt/hooks";
import {Evt} from "evt";


export function useClickOut(params: {
    refs: React.RefObject<HTMLElement>[];
    onClickOut(): void;
}){
    const {onClickOut, refs} = params;


    useEvt(ctx => Evt.from(ctx, window, "click")
        .attach((event)=> {

            for(const ref of refs){
                if(ref.current === event.target) return;
            }

            onClickOut();
        })
    ,[]);
        
};