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

% Signature: member(Item, List)/2
% Purpose: succeeds if and only if Item is an element of List
member(X, [X|Xs]).
member(X, [Y|Ys]) :-
     member(X, Ys).

% Signature: subset(List1, List2)/2
% Purpose: succeeds if and only if List1 is a subset of List2
subset([],[]).
subset([],[_|_]).
subset([H|T],Y) :-
    member(H,Y), subset(T,Y).

% Signature: subsuperset(List1, List2)/2
% Purpose: succeeds if and only if List1 is a superset of List2
subsuperset([],[]).
subsuperset([_|_],[]).
subsuperset(X,[H|T]):-
    member(H,X), subsuperset(X,T).

% signature: duplicate(Item, List)/2
% Purpose: succeeds if and only if Item  appears at least twice in List
duplicate(H,[H|A]) :-
     member(H,A).
duplicate(H,[_|T]) :-
     duplicate(H,T).

% Signature: dups(List1, List2)/2
% Purpose: succeeds if and only if every item in List1 appears at least twice in List2
dups([],[]).
dups([],[_|_]).
dups([H|T],X) :-
    (duplicate(H,X)), dups(T,X).

% Signature: unique2(List, UniqueList, Dups, List2)/4
% Purpose: succeeds if and only if UniqueList contains the same elements of List without duplicates (according to their order in List), and Dups contains the duplicates, and List2 contains the same elements of List without duplicates (according to their order in List) and Dups contains the duplicates
% we use List2 because we want to move forward on the list but still have the originial List
unique2([],[],[],[],[]).
unique2(LIST,[],DUPS,UNIQ,ORIGINALLIST):-
    dups(DUPS,ORIGINALLIST), subsuperset(DUPS,LIST), subset(LIST,UNIQ).
unique2([H|LIST],[H|T],DUPS, UNIQ,ORIGINALLIST):-
    unique2(LIST, T, DUPS, UNIQ, ORIGINALLIST).

% Signature: unique(List, UniqueList, Dups)/3
% Purpose: unique2 wrapper to send LIST twice
unique(LIST,UNIQ,DUPS):-
    unique2(LIST,UNIQ,DUPS,UNIQ,LIST).