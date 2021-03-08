import {useEvt} from "evt/hooks";
import {Evt} from "evt";


export function useClickOut2(params: {
    refs: React.RefObject<HTMLElement>[];
    onClickOut(): void;
}){
    const {onClickOut, refs} = params;




    useEvt(ctx => Evt.from(ctx, window, "click")
        .attach((event)=> {


            for(const ref of refs){

                if(getIsClickedIn({
                    "event": event as Omit<MouseEvent, "initMouseEvent">,
                    ref
                })) return;

            }

        

           

            onClickOut();
        })
    ,[]);
        
};

function getIsClickedIn(
    params: {
        event: Omit<MouseEvent, "initMouseEvent">;
        ref: React.RefObject<HTMLElement>
    }
): boolean{

    const {event, ref} = params;

    if(!ref.current) return null as any;

    if(ref.current.childElementCount === 0){
        return ref.current === event.target;
    };

    let out = false;

    ref.current.childNodes.forEach(childNode =>{

        if(childNode === event.target){
            out = true;
        }

    });

    return out;


}






