/*
 * **********************************************
 * Printing result depth
 *
 * You can enlarge it, if needed.
 * **********************************************
 */
maximum_printing_depth(100).

:- current_prolog_flag(toplevel_print_options, A),
   (select(max_depth(_), A, B), ! ; A = B),
   maximum_printing_depth(MPD),
   set_prolog_flag(toplevel_print_options, [max_depth(MPD)|B]).

% Signature: notmember(X, List)/2
% Purpose: X is not a member of List.
member(X, [X|_Xs]).
member(X, [_Y|Ys]) :-
    member(X, Ys).

% Signature: member(X, List)/2
% Purpose: X is a member of List.
notmember(_X ,[]).
notmember(X, [H|T]) :-
    X \= H, notmember(X,T).

% Signature: subset(List1, List2)/2
% Purpose: List1 is subset of List2
subset([], _L).
subset([H|T], L) :-
    member(H, L), subset(T, L).

% Signature: isunique(List)/1
% Purpose: List has unique values
isunique([]).
isunique([H|T]) :-
    notmember(H,T), isunique(T).

% Signature: unique_(List, UniqueList, Dups, Current_Item)/4
% Purpose: succeeds if and only if UniqueList contains the same elements of List without duplicates (according to their order in List), and Dups contains the duplicates
unique_([],[],[],_CURR).
unique_([LH|LT], [UH|UT], D, _CURR) :-
    LH=UH, unique_(LT, UT, D, LH).
unique_([LH|LT], [], [DH|DT], _CURR) :-
    LH=DH, unique_(LT, [], DT, LH).
unique_([LH|LT], U, [DH|DT], CURR) :-
    LH=DH, LH=CURR, unique_(LT, U, DT, LH).

% Signature: unique(List, UniqueList, Dups)/3
% Purpose: unique_ wrapper
unique(List, UniqueList, Dups) :-
    unique_(List, UniqueList, Dups, _CURR), isunique(UniqueList), subset(Dups, UniqueList). 
